import { PrismaClient } from "@/generated/client";
import { compare } from "bcrypt";
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
            profileCompleted: user.profileCompleted,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // For Google provider, verify user exists in database
      if (account?.provider === "google") {
        try {
          // Check if user exists in our database
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          // If user doesn't exist, deny sign in
          if (!dbUser) {
            console.log("Google sign-in denied: User not found in database");
            return false; // This will prevent sign-in
          }

          // User exists, allow sign in
          return true;
        } catch (error) {
          console.error("Error checking user in database:", error);
          return false;
        }
      }

      // For credentials provider, verify user exists and has password
      if (account?.provider === "credentials") {
        try {
          // The authorize function already validated credentials
          // Here we just do a final check that user exists
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          if (!dbUser) {
            console.log(
              "Credentials sign-in denied: User not found in database",
            );
            return false;
          }

          if (!dbUser.password) {
            console.log(
              "Credentials sign-in denied: Account uses social login",
            );
            return false;
          }

          // User exists with password, allow sign in
          return true;
        } catch (error) {
          console.error("Error checking credentials user in database:", error);
          return false;
        }
      }

      // For any other provider, allow sign in
      return true;
    },
    async jwt({ token, user, account, trigger }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profileCompleted = user.profileCompleted;
      }

      // For Google provider, fetch user data from database
      if (account && account.provider === "google") {
        try {
          // Fetch user from database (we know they exist because signIn callback verified)
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              profileCompleted: true,
            },
          });

          if (dbUser) {
            // Update token with database user data
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.profileCompleted = dbUser.profileCompleted;
          }
        } catch (error) {
          console.error("Error fetching Google user from database:", error);
        }
      }

      // On session update, refresh user data from database
      if (trigger === "update") {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
            select: {
              id: true,
              role: true,
              profileCompleted: true,
            },
          });

          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.profileCompleted = dbUser.profileCompleted;
          }
        } catch (error) {
          console.error("Error updating token:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.profileCompleted = token.profileCompleted as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=authentication_failed", // Error code passed in query string
  },
};

export default NextAuth(authConfig);

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
