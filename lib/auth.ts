import prisma from "@/db";
import { UserProgress } from "@/generated/client";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
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
    async signIn({ user, account }) {
      // For Google provider, check if user exists and create if needed
      if (account?.provider === "google") {
        try {
          // Check if user exists in our database
          let dbUser = await prisma.user.findUnique({
            where: { email: user.email as string },
          });

          // If user doesn't exist, create them (this is a sign-up)
          if (!dbUser) {
            console.log("Creating new Google user in database");
            dbUser = await prisma.user.create({
              data: {
                email: user.email as string,
                name: user.name || user.email?.split("@")[0] || "User",
                image: user.image,
                role: "user",
                profileCompleted: false,
                // Note: No password for Google OAuth users
              },
            });
          }

          // User exists or was just created, allow sign in
          return true;
        } catch (error) {
          console.error("Error handling Google user in database:", error);
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
              userProgress: true,
            },
          });

          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.profileCompleted = dbUser.profileCompleted;
            token.userProgress = dbUser.userProgress;
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
        session.user.userProgress = token.userProgress as UserProgress;
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
