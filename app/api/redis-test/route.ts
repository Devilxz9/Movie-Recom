import { redis } from "@/lib/redis";
export async function GET(){
    try {
        // step 1 : store data
        await redis.set("test", "hello redis")

        // step 2: get data
        const value = await redis.get("test")

        return Response.json({
            message: "redis working",
            data:value
        })
    } catch (error) {
        console.log(error,"redis error")
        return new Response("Redis error", { status: 500 });
    }
}