"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { cn, convertImageToBase64 } from "@/lib/utils";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
        onResponse: (ctx) => {
          setLoading(false);
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
        className="block z-10 mx-auto -mt-16 md:mt-16"
        src="/logo.png"
        alt="Logo"
        width={120}
        height={120}
      />
      <h1 className="md:mb-6 font-semibold text-4xl text-center">Sign Up</h1>
      {/* Google Sign Up Button */}
      <button
        disabled={loading}
        className="flex justify-center justify-self-center items-center gap-7 columns-1 shadow-md mx-auto my-4 py-2 rounded-2xl outline outline-1 outline-primary-red w-5/6"
        onClick={handleGoogleSignUp}
      >
        <Image
          className="object-cover overflow-x-clip contain-layout"
          src="/googlelogo.png"
          width={20}
          height={20}
          alt="Google Logo"
        />
        <div className="font-semibold text-primary-red text-lg">
          Sign Up with Google
        </div>
      </button>
      {/* Divider */}
      <div className="flex items-center gap-x-5 md:my-2 px-52 w-full">
        <hr className="flex-auto border-1 border-gray-300 w-2/6" />
        <p className="text-black text-base">or</p>
        <hr className="flex-auto border-1 border-gray-300 w-2/6" />
      </div>

      {/* Form */}
      <Card className="shadow-none border-none outline-none w-full">
        <CardContent>
          <div className="gap-4 grid">
            <div className="gap-4 grid grid-cols-2">
              <div className="gap-2 grid">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </div>
              <div className="gap-2 grid">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </div>
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Password"
              />
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="password_confirmation"
                className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="image">Profile Image (optional)</Label>
              <div className="flex justify-center items-end gap-4">
                {imagePreview && (
                  <div className="relative rounded-sm w-16 h-16 overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
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
                      className="cursor-pointer"
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
                    onResponse: () => {
                      setLoading(false);
                    },
                    onRequest: () => {
                      toast.info("Creating your account...");
                      setLoading(true);
                    },
                    onError: (ctx) => {
                      toast.error(ctx.error.message);
                    },
                    onSuccess: async () => {
                      toast.success("Account created successfully");

                      router.push(
                        pathname + "?step=verify" + `&email=${email}`,
                      );
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
      <div className="inline-flex justify-center items-center gap-2 mb-5 w-full font-light text-xs text-center">
        <span className="gap-2 tracking-tight">Already have an account?</span>
        <Link
          href="/Login"
          className="text-primary-red tracking-tighter"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
