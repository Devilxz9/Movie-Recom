import { prisma } from "@/lib/prisma";

const CACHE_ID = 1;
const CACHE_TTL_MS = 5 * 24 * 60 * 60 * 1000;

export type HomepageMovie = {
  tmdbId: number;
  title: string;
  year: string;
  genre: string;
  rating: string;
  image: string;
};

type TmdbMovie = {
  id: number;
  title?: string;
  release_date?: string;
  genre_ids?: number[];
  vote_average?: number;
  poster_path?: string | null;
};

const genreNames: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  18: "Drama",
  27: "Horror",
  10749: "Romance",
  878: "Sci-fi",
  9648: "Mystery",
};

const fallbackMovies: HomepageMovie[] = [
  { tmdbId: 693134, title: "Dune: Part Two", year: "2024", genre: "Sci-fi · Drama", rating: "8.7", image: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
  { tmdbId: 986280, title: "Past Lives", year: "2023", genre: "Romance · Drama", rating: "7.8", image: "https://image.tmdb.org/t/p/w780/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg" },
  { tmdbId: 840430, title: "The Holdovers", year: "2023", genre: "Comedy · Drama", rating: "7.9", image: "https://image.tmdb.org/t/p/w780/VHSzNBTwxV8vh7wylo7O9CLdac.jpg" },
  { tmdbId: 872585, title: "Oppenheimer", year: "2023", genre: "Biography · Drama", rating: "8.6", image: "https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { tmdbId: 939243, title: "The Wild Robot", year: "2024", genre: "Animation · Family", rating: "8.3", image: "https://image.tmdb.org/t/p/w780/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg" },
];

function isHomepageMovie(value: unknown): value is HomepageMovie {
  if (!value || typeof value !== "object") return false;
  const movie = value as Record<string, unknown>;
  return typeof movie.tmdbId === "number" &&
    typeof movie.title === "string" &&
    typeof movie.year === "string" &&
    typeof movie.genre === "string" &&
    typeof movie.rating === "string" &&
    typeof movie.image === "string";
}

function normalizeMovies(value: unknown): HomepageMovie[] {
  return Array.isArray(value) ? value.filter(isHomepageMovie) : [];
}

async function fetchTrendingMovies(): Promise<HomepageMovie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error("TMDB_API_KEY is not configured");

  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${encodeURIComponent(apiKey)}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`TMDB trending request failed with status ${response.status}`);

  const data = await response.json() as { results?: TmdbMovie[] };
  const movies = (data.results ?? []).filter((movie) => movie.poster_path && movie.title).slice(0, 10).map((movie) => ({
    tmdbId: movie.id,
    title: movie.title!,
    year: movie.release_date?.slice(0, 4) || "Year unavailable",
    genre: (movie.genre_ids ?? []).slice(0, 2).map((id) => genreNames[id] ?? "Film").join(" · ") || "Film",
    rating: (movie.vote_average ?? 0).toFixed(1),
    image: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
  }));
  if (movies.length === 0) throw new Error("TMDB returned no usable trending movies");
  return movies;
}

export async function getHomepageMovies(): Promise<HomepageMovie[]> {
  let cachedMovies: HomepageMovie[] = [];
  let cachedFetchedAt: Date | undefined;
  try {
    const cached = await prisma.homepageMovieCache.findUnique({ where: { id: CACHE_ID } });
    cachedMovies = normalizeMovies(cached?.movies);
    cachedFetchedAt = cached?.fetchedAt;
  } catch (error) {
    console.error("Unable to read homepage movie cache", error);
  }

  if (cachedMovies.length > 0 && cachedFetchedAt && Date.now() - cachedFetchedAt.getTime() < CACHE_TTL_MS) return cachedMovies;

  try {
    const movies = await fetchTrendingMovies();
    try {
      await prisma.homepageMovieCache.upsert({
        where: { id: CACHE_ID },
        create: { id: CACHE_ID, movies },
        update: { movies },
      });
    } catch (error) {
      console.error("Unable to save homepage movie cache", error);
    }
    return movies;
  } catch (error) {
    console.error("Unable to refresh homepage movies from TMDB", error);
    return cachedMovies.length > 0 ? cachedMovies : fallbackMovies;
  }
}
