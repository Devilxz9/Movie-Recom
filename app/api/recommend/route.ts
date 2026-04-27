import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


const getMovieImage = async (title: string, type: "movie" | "tv") => {

  try {
    // fuzzy search - first searching movie got from the Ai and picking the closes result
    const res = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(title)}`)

    const data = await res.json()

    if (data.results && data.results.length > 0 && data.results[0].poster_path) {

      return `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
    } else{
      return null
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
  const savedMovies = await prisma.savedMovie.findMany({
    where:{
      userId: session.user.id,
    }
  })

  const savedTitles = savedMovies.map((e:any)=> e.title)
  try {
    const { preferences } = await req.json();

    // CREATE CACHE KEY FOR REDIS
    let query = preferences.toLowerCase()

    const stopWord = ["best", "top", "movies", "movie", "films", "film", "show", "series"];
    query = query
    .split(/\s+/)
    .filter((word:string) => !stopWord.includes(word))
    .join(" ")
    const key = "movies:" + query.replace(/\s+/g, "-")

    // CHECH CACHE FIRST
    const cached = await redis.get(key);
    if(cached){
      console.log("cahche hit")
      return Response.json({
        source: "cache",
        ...cached
      })
    }
    console.log(" CACHE MISS → calling APIs");

    const prompt = `
You are a JSON generator.

User likes:
${preferences}

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT use backticks.
Do NOT explain anything.

Return exactly in this format:

{
  "movies": [
    {
      "title": "Movie name",
      "description": "Short description"
      "Released": "Released year"
    }
  ],
  "series": [
    {
      "title": "Series name",
      "description": "Short description"
      "Released": "Released year"
    }
  ]
}

Return EXACTLY:

- 9 movies
- 9 series
- and do not return the same movies which the user has mentioned
- the movies and series must compliment the user preferences and should not be random
- do not suggest these movies as user has already watched it ${savedTitles.join(",")}

Make sure BOTH arrays are filled.
Do not return empty arrays.

`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const result = await model.generateContent(prompt);

    const response = await result.response;
    let text = response.text();
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

    const MovieWithImages = await Promise.all(
      parsed.movies.map(async(movie:any)=>{
        const image = await getMovieImage(movie.title, "movie");
        return{
          ...movie,
          image,
        }
      })
    );

    const SeriesWithImaages = await Promise.all(
      parsed.series.map(async(show:any)=>{
        const image = await getMovieImage(show.title, "tv");
        return{
          ...show,
          image,
        }
      })
    )

    // final movie data with name and posters
    const finalData = {
      movies: MovieWithImages,
      series: SeriesWithImaages
    };

    // STORE IN REDIS FOR 10MINS
    await redis.set(key, finalData,{ex: 600})

    return Response.json({
      source:"recomend api",
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