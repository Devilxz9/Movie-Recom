import { getHomepageMovies } from "@/lib/homepageMovies";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await getHomepageMovies());
  } catch (error) {
    console.error("Unable to load homepage movies", error);
    return Response.json({ error: "Unable to load homepage movies" }, { status: 500 });
  }
}
