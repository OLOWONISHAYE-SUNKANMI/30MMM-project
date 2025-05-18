"use client";

import SocialButton from "@/components/auth/social-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const CALLBACK_URL = "/rsc";

  useEffect(() => {
    authClient.oneTap({
      fetchOptions: {
        onError: ({ error }) => {
          toast.error(error.message || "An error occurred");
        },
        onSuccess: () => {
          toast.success("Successfully signed in");
          router.push(CALLBACK_URL);
        },
      },
    });
    // Some Notes on useEffect and the Dependency Array:
    //
    // ESLint think the router goes in the dependency array, but it is not
    // necessary because the effect is not dependent on the state of the router.
    // Weirdly, ESLint doesn't want toast to be added to the dependency array.
    //
    // If router is a dependency, it creates a weird non-fatal dev error
    // that does not seem to happen when the dependency array is empty.
    // The error is related to FedCM, which is the new API for federated login
    // used in OneTap. I have not tested the page on a browser with Intelligent
    // Tracking Prevention (ITP) enabled, but the Sign In With Google button
    // is there as a fallback. The UX is nicer with OneTap.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setError(null);
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Logged in successfully");
          router.push(CALLBACK_URL);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <div className="inset-auto flex min-h-screen w-screen min-w-[400px] flex-col md:flex-row">
      <div className="fixed left-2 top-2 z-20 rounded-md bg-white/80 py-1 before:static max-md:shadow-md"></div>
      <div className="-z-50 aspect-[773/499] min-h-72 bg-white bg-jesus-hero bg-cover bg-center bg-no-repeat max-md:h-fit max-md:w-full max-md:bg-top max-xs:scale-x-125 sm:self-stretch md:order-2 md:w-3/4 md:overflow-x-clip md:bg-cover md:bg-clip-border md:bg-top-4 md:bg-origin-border"></div>
      <div className="z-10 flex w-full flex-col gap-1 max-md:justify-between md:h-full md:w-1/2 md:items-center md:justify-between md:gap-3 md:pt-7">
        <Image
          className="z-10 mx-auto -mt-16 block md:mt-16"
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
        />
        {/* The LOGO has a negative top margin "-mt-16" to pull it halfway up over the image on small screens. */}
        <h1 className="text-center text-4xl font-semibold md:mb-6">
          Welcome Back!
        </h1>

        <SocialButton
          provider="google"
          icon={<FaGoogle className="hover:fill-white" />}
          label="Sign in with Google"
          callbackURL={CALLBACK_URL}
        ></SocialButton>
        <div className="flex w-full items-center gap-x-5 px-52 md:my-2">
          <hr className="border-1 w-2/6 flex-auto border-gray-300" />
          <p className="text-base text-black">or</p>
          <hr className="border-1 w-2/6 flex-auto border-gray-300" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-full w-full flex-auto space-y-4 lg:px-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={loading}
                      className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                      placeholder="your.email@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="block px-8">
              <Button
                type="submit"
                disabled={loading}
                className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
              >
                <span className="text-center text-lg font-medium tracking-wider text-white">
                  LOGIN
                </span>
              </Button>
            </div>
            <div className="-mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-xs font-light">
              {!!error && <p className="text-red-500">{error}</p>}
              <span className="gap-2 tracking-tight">Not registered yet?</span>
              <Link
                href="/SignUp"
                className="tracking-tighter text-primary-red"
              >
                Create an Account
              </Link>
            </div>
            <div className="-mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-xs font-light">
              <span>
                <Link
                  href="/" //TODO: need to add a reset password page
                  className="tracking-tighter text-primary-red"
                >
                  Forgot Password?
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
