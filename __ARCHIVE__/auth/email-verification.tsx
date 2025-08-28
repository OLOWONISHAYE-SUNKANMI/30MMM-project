"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function EmailVerification({ email }: { email?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log("Email from searchParams: ", email);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form submitted with data:", data);
    authClient.emailOtp.verifyEmail(
      {
        email: email as string,
        otp: data.pin as string,
      },
      {
        onRequest: () => {
          setLoading(true);
          toast.info(`Checking your code for ${email}...`);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: (ctx) => {
          toast.success("Success! Moving to the next step.");
          setLoading(false);
          if (ctx.data.user.premium as boolean) router.push("/dashboard");
          router.push("/profile");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to verify email.");
          setLoading(false);
        },
      },
    );
  }

  return (
    <Card className="z-10 flex h-full flex-col justify-start space-y-10 border-none shadow-none outline-none max-md:justify-between lg:pt-20">
      <Image
        className="z-10 mx-auto -mt-16 block md:mt-16"
        src="/logo.png"
        alt="Logo"
        width={120}
        height={120}
      />
      <h1 className="text-center text-4xl font-semibold md:mb-6">
        Verify Email Address
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full place-content-center items-start gap-y-10 space-y-10 text-center"
        >
          <CardContent>
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mr-auto">
                    Please enter the 6-digit code sent to your email to verify
                    your address
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className="mr-auto"
                    >
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />

                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />

                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="my-5">
                    Verify your email address by entering the code sent to{" "}
                    {email || "your email address"}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <div
              className={cn(
                "flex w-full flex-col items-center justify-between gap-2",
              )}
            >
              <Button
                type="submit"
                className="block w-fit"
                disabled={loading}
              >
                {loading ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                ) : (
                  "Verify Email"
                )}
              </Button>
              <div className="mt-5 block w-full items-center justify-center gap-2 text-center text-sm font-light">
                <span className="gap-2 tracking-tight">
                  Didn&apos;t receive the code?{" "}
                </span>
                <Button
                  variant="link"
                  onClick={() => {
                    authClient.emailOtp.sendVerificationOtp({
                      email: email as string,
                      type: "email-verification",
                    });
                  }}
                  className="font-semibold tracking-tighter text-primary-red"
                >
                  Request New Code
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
