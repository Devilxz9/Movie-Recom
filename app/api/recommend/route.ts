import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);


const getMovieImage = async (title: string, type: "movie" | "tv") => {

  try {
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

  const savedMovies = await prisma.savedMovie.findMany({
    where:{
      userId: session.user.id,
    }
  })

  const savedTitles = savedMovies.map((e:any)=> e.title)
  try {
    const { preferences } = await req.json();

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

- 8 movies
- 8 series
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

    return Response.json({
      movies: MovieWithImages,
      series: SeriesWithImaages
    });

  } catch (error) {
    console.error("ERROR:", error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}