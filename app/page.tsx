import HomeContent from "./HomeContent";
import { getHomepageMovies } from "@/lib/homepageMovies";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const trending = await getHomepageMovies();
  return <HomeContent trending={trending} />;
}
