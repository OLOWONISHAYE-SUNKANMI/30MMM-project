"use client";

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
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useReadLocalStorage } from "@/hooks/use-read-localstorage";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function EmailVerification() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const email = useReadLocalStorage<string | null>("email");

  console.log("Email from localStorage:", email);

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
          if (ctx.data.user.premium as boolean) router.push("/Dashboard");
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
    <Card className="h-full self-center justify-self-stretch border-none shadow-none outline-none lg:h-[800px]">
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
                  <FormLabel className="mr-auto text-lg lg:text-2xl">
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
                        <InputOTPSeparator />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSeparator />
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
                "flex w-full items-center gap-2",
                "flex-col justify-between",
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
            </div>
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
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
