import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

interface AppUser extends User {
  id: string;
  name?: string | null;
  email?: string | null;
}

interface CredentialsInput {
  email: string;
  password: string;
}

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AppUser | null> {
        const mockUser = {
          id: "1",
          name: "Admin",
          email: "admin@example.com",
          password: "password123"
        };

        if (credentials?.email === mockUser.email && 
            credentials?.password === mockUser.password) {
          return {
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: NextAuthJWT; user?: AppUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: NextAuthJWT }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  }
};

declare module "next-auth" {
  interface Session {
    user: AppUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}