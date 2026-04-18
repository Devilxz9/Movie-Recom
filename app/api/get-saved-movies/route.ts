import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(){
    const session = await getServerSession(authOptions)

    if(!session){
        return Response.json(
            {error: "unauthorised"},
            {status:401}
        )
    }

    const movies = await prisma.savedMovie.findMany({
        where:{
            userId: session.user.id
        }
    })

    return Response.json(movies)
}
