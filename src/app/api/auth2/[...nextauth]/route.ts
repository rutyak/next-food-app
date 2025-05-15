import clientPromise from "@/lib/dbConnect";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            scope: "openid email profiles"
        }
      }
    }),
  ],
};

export default NextAuth(authOptions);