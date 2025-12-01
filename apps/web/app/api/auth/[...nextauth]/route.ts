import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from "@repo/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    // GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",   // 🔥 Always show account chooser
        },
      },
    }),

    // GITHUB LOGIN
    GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  authorization: {
    params: {
      allow_signup: true,
      login: "", // force GitHub to show login even if session exists
    },
  },
}),

    // CREDENTIALS LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("🔵 AUTHORIZE START");

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("USER:", user);

        // LOGIN
        if (user) {
          if (!user.password) {
            console.log("❌ OAuth user cannot login with password");
            throw new Error("Use Google/GitHub to login");
          }

          const match = await bcrypt.compare(credentials.password, user.password);
          if (!match) return null;

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
          };
        }

        // SIGNUP (first time credentials user)
        const hashed = await bcrypt.hash(credentials.password, 10);

        const newUser = await prisma.user.create({
          data: {
            email: credentials.email,
            password: hashed,
            auth_type: "Credentials",
          },
        });

        return {
          id: newUser.id.toString(),
          email: newUser.email,
          name: newUser.name,
        };
      },
    }),
  ],

  // 🔥 Required Fix for Google/GitHub Callback BUG
  cookies: {
    state: {
      name: "next-auth.state",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  // When OAuth succeeds → ensure entry is in DB
  events: {
    async signIn({ user, account }) {
      if (!user.email) return;

      const existing = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existing) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name || "",
            auth_type: account?.provider || "oauth",
          },
        });
        console.log("🟢 OAuth user added to DB");
      }
    },
  },

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: session.user?.name || null,
        email: session.user?.email || null,
        image: session.user?.image || null,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
