import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session){
        return Response.json(
            {error: "not logged in" },
        {status:401})
    }

    const {title, image, tmdbId, type, reaction} = await req.json()

    const result = await prisma.movieReaction.upsert({
        where:{
            userId_title:{
                userId:session.user.id,
                title:title
            }
        },
        update:{
            reaction
        },
        create:{
            title,
            image,
            tmdbId,
            type,
            reaction,
            userId:session.user.id
        }
    })

    console.log("like dislike api hit")

    return Response.json(result)

}


export async function DELETE(req: Request){
    const session = await getServerSession(authOptions)
    console.log("delete working?")
    try {
        if(!session){
            return Response.json(
                {error:"unauthorised"},
                {status:401}
            )
        }

         const {title} = await req.json()

         await prisma.movieReaction.delete({
            where:{
                userId_title:{
                    userId:session.user.id,
                    title:title
                }
            }
            
         })
          return Response.json({success:true})
    } catch (error) {
        console.log(error,"deleting reaction database")
         return Response.json({ error: "Failed to delete" }, { status: 500 })
    }
       
   
}