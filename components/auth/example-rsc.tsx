// This is a a server component!

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function ExampleServerComponent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    // Otherwise, you can throw a redirect to the sign-in page like this:
    //
    // if (!session) {
    //   throw redirect("/login");
    // }
    return <div>Not authenticated</div>;
  }
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4 p-4">
      <h1 className="mb-8 font-mono text-5xl font-black">
        Welcome, {session.user.name}!
      </h1>
      <p className="ml-52 self-start text-xl">
        Can I hit you up at&nbsp;
        <span className="text-bold text-2xl">{session.user.email}</span>?
      </p>
      <p className="animate-pulse">
        By the way, you have{" "}
        <span className="text-2xl text-red-700">
          {session.user.premium ? "already" : "not"}
        </span>{" "}
        made your donation.
      </p>
      <p className="text-xl">
        {!session.user.paidAt && (
          <span>Unpaid as of: {new Date().toISOString().slice(0, 10)}</span>
        )}
        {session.user.paidAt && (
          <span>
            Paid as of: {session.user.paidAt.toISOString().slice(0, 10)}
          </span>
        )}
      </p>
    </div>
  );
}
