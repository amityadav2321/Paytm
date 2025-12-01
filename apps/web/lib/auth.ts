import { prisma } from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";


export const authOptions = {
  providers: [
    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Github Login
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    // Credentials Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        if (!credentials) return null;

        const existingUser = await prisma.user.findFirst({
          where: { number: credentials.phone },
        });

        // LOGIN
        if (existingUser && existingUser.password) {
          const isValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (isValid) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }

          return null;
        }

        // SIGNUP
        const hashed = await bcrypt.hash(credentials.password, 10);

        const newUser = await prisma.user.create({
          data: {
            number: credentials.phone,
            password: hashed,
            auth_type: "Credentials",
          },
        });

        return {
          id: newUser.id.toString(),
          name: newUser.name,
          email: newUser.number,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
