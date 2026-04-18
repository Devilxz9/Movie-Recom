import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";


export async function POST(req:Request){
    const session = await getServerSession(authOptions);
    if(!session){
        return Response.json(
            {error:"unauthorized"},
            {status:401}
        )
    }

    const body = await req.json();
    console.log(Object.keys(prisma));

    const savedMovie = await prisma.savedMovie.create({
        data: {
            title:body.title,
            image:body.image,
            type:body.type,
            userId: session.user.id,
        },
    });

    return Response.json(savedMovie);
}