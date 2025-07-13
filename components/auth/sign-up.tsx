"use client";

import { useState } from "react";
import type { ResponseContext } from "better-auth/react";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn, convertImageToBase64 } from "@/lib/utils";

export default function SignUp({ callbackUrl }: { callbackUrl?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const CALLBACK_URL = callbackUrl || "/";
  const pathname = usePathname();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Replace the Base64 encoded image URL with an upload to Azure Blob Storage
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: CALLBACK_URL,
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse: (ctx: ResponseContext) => {
          toast.info("Server has responded, redirecting...");
          setLoading(false);
        },
        onSuccess: async (ctx) => {
          toast.success(ctx.data.user ?? "Signed in successfully");
        },
      },
    );
  };

  return (
    <div
      className={cn(
        "z-10 flex w-full flex-col gap-1 max-md:justify-between md:h-full md:items-center md:justify-between md:gap-3 md:pt-7",
      )}
    >
      <Image
        className="z-10 mx-auto -mt-16 block md:mt-16"
        src="/logo.png"
        alt="Logo"
        width={120}
        height={120}
      />
      <h1 className="text-center text-4xl font-semibold md:mb-6">Sign Up</h1>
      {/* Google Sign Up Button */}
      <button
        disabled={loading}
        className="mx-auto my-4 flex w-5/6 columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 shadow-md outline outline-1 outline-primary-red"
        onClick={handleGoogleSignUp}
      >
        <Image
          className="overflow-x-clip object-cover contain-layout"
          src="/googlelogo.png"
          width={20}
          height={20}
          alt="Google Logo"
        />
        <div className="text-lg font-semibold text-primary-red">
          Sign Up with Google
        </div>
      </button>
      {/* Divider */}
      <div className="flex w-full items-center gap-x-5 px-52 md:my-2">
        <hr className="border-1 w-2/6 flex-auto border-gray-300" />
        <p className="text-base text-black">or</p>
        <hr className="border-1 w-2/6 flex-auto border-gray-300" />
      </div>

      {/* Form */}
      <Card className="w-full border-none shadow-none outline-none">
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="password_confirmation"
                className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image (optional)</Label>
              <div className="flex items-end justify-center gap-4">
                {imagePreview && (
                  <div className="relative h-16 w-16 overflow-hidden rounded-sm">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      className="h-auto max-w-16 rounded-full object-cover"
                      layout="fill"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <X
                      className="cursor-pointer rounded-full outline-1 outline-red-500 hover:fill-red-500 hover:text-red-500"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={async () => {
                await authClient.signUp.email({
                  email,
                  password,
                  name: `${firstName} ${lastName}`,
                  image: image ? await convertImageToBase64(image) : "",
                  fetchOptions: {
                    onRequest: () => {
                      toast.info("Creating your account...");
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                    onError: (ctx) => {
                      toast.error(ctx.error.message);
                    },
                    onSuccess: async () => {
                      toast.success("Account created successfully");
                      toast.info(
                        "Please check your email to verify your account",
                      );
                      router.push(pathname + `?step=verify&email=${email}`);
                    },
                  },
                });
              }}
            >
              {loading ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div
            className={cn(
              "flex w-full items-center gap-2",
              "flex-col justify-between",
            )}
          ></div>
        </CardFooter>
      </Card>

      {/* Login Link */}
      <div className="mb-5 inline-flex w-full items-center justify-center gap-2 text-center text-xs font-light">
        <span className="gap-2 tracking-tight">Already have an account?</span>
        <Link
          href="/LogIn"
          className="tracking-tighter text-primary-red"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
