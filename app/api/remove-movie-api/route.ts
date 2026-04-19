import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";


export async function DELETE(req:Request){
     const session = await getServerSession(authOptions)

const body = await req.json()

const RemoveMovie = await prisma.savedMovie.delete({

    where:{
       id: body.id,
       userId: session?.user.id 
    }
})

return Response.json({success:true})
}