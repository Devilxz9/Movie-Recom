
export default function Page() {
  // const session = await getServerSession(authOptions)
  const [movies, setMovies] = useState([])
useEffect(() => {
  const fetchMovies = async()=>{
    try {
      const res = await fetch("/api/get-saved-movies");
      const data = await res.json()
      console.log("movies",data)
      setMovies(data)
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  }

    fetchMovies()
}, []);