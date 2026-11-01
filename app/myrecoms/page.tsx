import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import CollectionView from "./CollectionView"

export const metadata = {
  title: "Movie Recom - My Recoms",
}

export default async function GetMovies() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const movies = await prisma.savedMovie.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return <CollectionView movies={movies.map((movie: { id: string; title: string; image: string | null; type: string; tmdbId: number | null; createdAt: Date }) => ({ ...movie, createdAt: movie.createdAt.toISOString() }))} />
}
