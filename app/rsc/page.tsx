import { ExampleServerComponent } from "@/components/auth/example-rsc";
import { SignOutButton } from "@/components/auth/sign-out-button";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="mt-28 flex h-[calc(80vh-100px)] w-[calc(100%-80px)] flex-col items-center justify-start bg-background">
      <SignOutButton className="self-end" />
      <h1 className="mb-32 font-serif text-5xl font-bold">
        Server Component Example
      </h1>
      <ExampleServerComponent />
    </div>
  );
};

export default Page;
