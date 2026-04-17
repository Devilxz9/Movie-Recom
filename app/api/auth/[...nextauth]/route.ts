import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt", // ✅ your choice
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({token,user}){
        // runs on login
        if(user){
            token.id = user.id
        }
        return token
    },

    async session({token, session}){
        //send data to frontend
        if(session.user){
            session.user.id = token.id as string; //attches id
        }
        return session
    }
  }
});

export { handler as GET, handler as POST };