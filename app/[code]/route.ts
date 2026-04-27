import {prisma} from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function GET(req:NextRequest, context:{params: Promise<{code:string}>}){
    try {
        const {code} = await context.params
        const data = await prisma.url.findUnique({
            where:{
                shortCode:code
            }
        });
        if(!data){
            return new Response("url not found",{status:404})
        }

        return Response.redirect(data.originalUrl)
    } catch (error) {
        console.log(error);
        return new Response("url server error",{status:500})
    }
}