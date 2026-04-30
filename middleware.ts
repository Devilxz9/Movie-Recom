import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })

    const { pathname } = request.nextUrl

    const protectedPages = ["/recommend", "/myrecoms", "/shortenurl"]



    const protectedApis = ["/api/recommend", "/api/remove-movie-api", "/api/save-movie", "/api/shorten"]

 // ✅ Check protected pages
  const isProtectedPage = protectedPages.some(route =>
    pathname.startsWith(route)
    
  );

  // ✅ Check protected APIs
  const isProtectedApi = protectedApis.some(route =>
    pathname.startsWith(route)
  );

  if(!token && isProtectedPage){
    return NextResponse.redirect(new URL("/login", request.url))
   
  }

  if(!token && isProtectedApi){
    return NextResponse.json({
        error: "not authenticated"},
        {status:401}
    )
  }

  if(token && pathname.startsWith("/login")){
    return NextResponse.redirect((new URL("/myrecoms",request.url)))
  }

    return NextResponse.next();
}

// 🎯 Matcher
export const config = {
  matcher: [
    "/recommend/:path*",
    "/myrecoms/:path*",
    "/api/:path*",
    "/login",
    "/shortenurl"
  ],
};