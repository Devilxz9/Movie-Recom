import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


const getMovieData = async (title: string, type: "movie" | "tv") => {

  try {
    // fuzzy search - first searching movie got from the Ai and picking the closes result
    const res = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(title)}`)

    const data = await res.json()

    if (data.results && data.results.length > 0) {
      const movie = data.results[0] // store first result

      let image = null
      if (movie.poster_path) {
        image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      }

      return {
        image: image,
        id: movie.id //needed this tmdb movie id for dfetching trailer
      }
    } else {
      return {
        image: null,
        id: null
      }
    }



  } catch (error) {
    console.log("TMBD error:", error)
    return null
  }

}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // writing this so ai knows which movies user has saved so it wont recommend the same movies/series again
  // const savedMovies = await prisma.savedMovie.findMany({
  //   where: {
  //     userId: session.user.id,
  //   }
  // })

  // const savedTitles = savedMovies.map((e: any) => e.title)
  try {
    const { preferences, seen= [] } = await req.json();

  
    
    // CREATE CACHE KEY FOR REDIS
    let query = preferences.toLowerCase()

    const stopWord = ["best", "top", "movies", "movie", "films", "film", "show", "series"];
    query = query
      .split(/\s+/)
      .filter((word: string) => !stopWord.includes(word))
      .join(" ")
    const key = `movies:${session.user.id}:${query}:page-${seen.length}`

    // CHECH CACHE FIRST
    const cached = await redis.get(key);
    if (cached) {
      console.log("cahche hit")
      return Response.json({
        source: "cache",
        ...cached
      })
    }
    console.log(" CACHE MISS → calling APIs");
      //finding saved,liked,didsliked movies and then giving instrcutions to LLM
    const [SavedMovies, LikedMovies, DislikedMovies] = await Promise.all([
      prisma.savedMovie.findMany({
        where: { userId: session.user.id },
        select: { title: true }
      }),
      prisma.movieReaction.findMany({
        where: { userId: session.user.id, reaction: "like" },
        select: { title: true }
      }),
      prisma.movieReaction.findMany({
        where: { userId: session.user.id, reaction: "dislike" },
        select: { title: true }
      })
    ])

    const savedTitles = SavedMovies.map((e: any) => e.title)
    const likedTitles = LikedMovies.map((e: any) => e.title)
    const dislikedTitles = DislikedMovies.map((e: any) => e.title)

    const prompt = `
You are a JSON generator.

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use backticks.
Do NOT explain anything.

Return exactly in this format:

{
  "movies": [
    {
      "title": "Movie name",
      "description": "Short description",
      "Released": "Released year"
    }
  ],
  "series": [
    {
      "title": "Series name",
      "description": "Short description",
      "Released": "Released year"
    }
  ]
}

Return EXACTLY:

Recommend 4 movies and 4 series for someone who likes: ${preferences}.
Exclude: ${[...savedTitles, ...likedTitles, ...seen].join(", ")}

Make sure BOTH arrays are filled.
Do not return empty arrays.

`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const result = await model.generateContent(prompt);

    const response = await result.response;
    let text = await response.text();
    // 🔥 CLEAN STEP
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    console.log("clean TEXT:", text);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.log("JSON parse error", error);
      return Response.json(
        { error: "invalid ai response" },
        { status: 500 }
      )
    }

    // const MovieWithImages = await Promise.all(
    //   parsed.movies.map(async (movie: any) => {
    //     const data = await getMovieData(movie.title, "movie");
    //     return {
    //       ...movie,
    //       image:data?.image,
    //       tmdbId:data?.id
    //     }
    //   })
    // );

    // const SeriesWithImaages = await Promise.all(
    //   parsed.series.map(async (show: any) => {
    //     const data = await getMovieData(show.title, "tv");
    //     return {
    //       ...show,
    //       image:data?.image,
    //       tmdbId:data?.id
    //     }
    //   })
    // )

    // HERE I MERGED BOTH OF THIS MOVIEWITHIMAGES AND SERIESWITHIMAGES TO RUN PARALLELY EARLIER IT WAS RUNNING FIRST MOVIEWITHIMAGES AND THEN SERIESWITHIMAGES WHICH WAS TAKING MORE TIME CUZ IT WAS RUNNING SUBSIQUENTIALLY

    const [MovieWithImages, SeriesWithImaages] = await Promise.all([
      Promise.all(parsed.movies.map(async (movie: any) => {
        const data = await getMovieData(movie.title, "movie");
        return {
          ...movie,
          image: data?.image,
          tmdbId: data?.id
        }
      })),

      Promise.all(parsed.series.map(async (show: any) => {
        const data = await getMovieData(show.title, "tv");
        return {
          ...show,
          image: data?.image,
          tmdbId: data?.id
        }
      }))
    ]);

    // final movie data with name and posters
    const finalData = {
      movies: MovieWithImages,
      series: SeriesWithImaages
    };
    console.log(finalData.movies)

    // STORE IN REDIS FOR 10MINS
    redis.set(key, finalData, { ex: 600 }).catch(console.error)

    return Response.json({
      source: "recomend api",
      ...finalData
    })

  } catch (error) {
    console.error("ERROR:", error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}