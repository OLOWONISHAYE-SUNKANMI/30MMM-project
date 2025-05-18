import { sendEmail } from "@/actions/send-email";
import prisma from "@/db";
import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  emailOTP,
  oAuthProxy,
  oneTap,
  openAPI,
} from "better-auth/plugins";

console.info("BETTER_AUTH_URL is currently: ", process.env.BETTER_AUTH_URL);

export const auth = betterAuth({
  // baseURL: baseUrl,
  user: {
    additionalFields: {
      premium: {
        type: "boolean",
        defaultValue: false,
      },
      profileCompleted: {
        type: "boolean",
        defaultValue: false,
      },
      paidAt: {
        type: "date",
        defaultValue: null,
        required: false,
      },
    },
  },
  database: prismaAdapter(prisma!, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email:${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    admin({
      adminUserIds: [
        "5aubsivaw25JiBcV12FnTRLV4j9IC03e",
        "lDaPBbCxexAPMZ5VGUb20Qolv2uBIVlW",
        "6wI3AifiigBBar2lH9e8M9TZ9jbSVx7k",
      ],
    }),
    openAPI(),
    oneTap(),
    oAuthProxy(),
    nextCookies(),
    emailOTP({
      expiresIn: 600,
      sendVerificationOnSignUp: true,
      sendVerificationOTP: async ({ email, otp, type }) => {
        switch (type) {
          case "email-verification":
            await sendEmail({
              to: email,
              subject: "Use this code to verify your email address",
              text: `Your OTP code is: ${otp}`,
            });
            break;
          case "forget-password":
            await sendEmail({
              to: email,
              subject: "Use this code to reset your password",
              text: `Your OTP code is: ${otp}`,
            });
            break;
          case "sign-in":
            await sendEmail({
              to: email,
              subject: "Use this code to sign in",
              text: `Your OTP code is: ${otp}`,
            });
            break;
          default:
            throw new Error("Invalid OTP type!");
        }
      },
    }),
  ],
  trustedOrigins: [
    "https://thecleanprogram.org",
    "https://localhost:3000",
    "http://localhost:3000",
    "https://30mmm-frontend-fork-git-better-auth-thirty-mighty-men.vercel.app",
    "https://30mmm-frontend-fork-xi.vercel.app",
  ],
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
