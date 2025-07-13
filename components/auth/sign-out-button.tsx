"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const SignOutButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const session = useSession();

  if (!session.data) {
    return (
      <Button
        className={cn("min-w-fit", className)}
        onClick={() => {
          router.push("/LogIn");
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <Button
      className={cn("min-w-fit", className)}
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/LogIn");
            },
          },
        });
      }}
    >
      Logout
    </Button>
  );
};
