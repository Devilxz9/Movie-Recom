import { prisma } from "@/lib/prisma";

function generateCode(){
    return Math.random().toString(36).substring(2,8)
}

export async function POST(req:Request) {
    try {
        let {url} = await req.json()
        if(!url.startsWith("http://") && !url.startsWith("https://")){
            url = "https://" + url
        }
        const shortcode = generateCode()
        const data = await prisma.url.create({
            data:{
                shortCode:shortcode,
                originalUrl:url
            }
        })
        return Response.json({
            shortUrl: `https://movie-recom-kappa.vercel.app/${shortcode}`
        })
    } catch (err) {
      console.error(err);
        return new Response("Error creating short URL", { status: 500 });
        
    }
}