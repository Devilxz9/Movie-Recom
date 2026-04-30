export async function GET(req: Request) {

  // 👉 1. Convert request URL into URL object
  const url = new URL(req.url) 
  // Example: "http://localhost:3000/api/trailer?id=157336"

  // 👉 2. Extract query params (?id=157336)
  const searchParams = url.searchParams

  // 👉 3. Get the id value
  const id = searchParams.get("id") 
   const type = searchParams.get("type")
  // id = "157336"

  // 👉 4. Safety check
  if (!id || !type) {
    return Response.json({ error: "No ID provided" }, { status: 400 })
  }

  try {

    // 👉 5. Call TMDb API to get videos
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
    )

    const data = await res.json()

    // 👉 6. Find trailer from response
    const trailer = data.results.find((vid: any) => {
      return vid.type === "Trailer" && vid.site === "YouTube"
    })

    // 👉 7. If no trailer found
    if (!trailer) {
      return Response.json({ error: "No trailer found" }, { status: 404 })
    }

    // 👉 8. Send trailer key back to frontend
    return Response.json({
      key: trailer.key // 🔥 this is YouTube video id
    })

  } catch (error) {

    console.log("Trailer API error:", error)

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}