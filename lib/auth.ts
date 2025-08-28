import { PrismaClient } from "@/generated/client";
import { compare } from "bcrypt"; // You'll need to install this package
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Find user in the database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          // If no user found
          if (!user) {
            return null;
          }
          //  if password doesn't match
          if (!(await compare(credentials.password, user.password))) {
            return null;
          }

          // Return the user object without sensitive data
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // For Google provider, we need to create/update the user in our database
      if (account && account.provider === "google") {
        try {
          // Check if user exists in our database
          let dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
          });

          // If not, create the user
          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                email: token.email as string,
                name: token.name as string,
                // Set appropriate defaults for a Google-authenticated user
                role: "user",
              },
            });
          }

          // Update token with database user data
          token.id = dbUser.id;
          token.role = dbUser.role;
        } catch (error) {
          console.error("Error syncing Google user with database:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
};

export default NextAuth(authConfig);

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
