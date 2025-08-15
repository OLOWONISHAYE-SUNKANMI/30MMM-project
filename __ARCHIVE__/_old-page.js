"use client";

import { useState } from "react";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // The name and value of the targeted field is deconstructed from the event object.
    // We plug in the previous state of the form data, then overwrite only the targeted field and value.

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted: ${JSON.stringify(formData)}`);
    alert(`Submitted: ${JSON.stringify(formData)}`);
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
        <SignInButton
          mode="redirect"
          redirecturl={
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL ||
            "/dashboard"
          }
          signInUrlFallback={
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL ||
            "/dashboard"
          }
        >
          <button className="mx-auto my-4 flex w-5/6 columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 shadow-md outline outline-1 outline-primary-red">
            <Image
              className="overflow-x-clip object-cover contain-layout"
              alt="Google Logo"
              src="/googlelogo.png"
              width={20}
              height={20}
            />
            <div className="text-lg font-semibold text-primary-red">
              Login with Google
            </div>
          </button>
        </SignInButton>
        <div className="flex w-full items-center gap-x-5 px-52 md:my-2">
          <hr className="border-1 w-2/6 flex-auto border-gray-300" />
          <p className="text-base text-black">or</p>
          <hr className="border-1 w-2/6 flex-auto border-gray-300" />
        </div>
        <form className="h-full w-full flex-auto space-y-4">
          <label
            htmlFor="email"
            className="mx-8 block"
          >
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
              placeholder="Email"
            />
          </label>
          <label
            htmlFor="password"
            className="mx-8 block"
          >
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
              placeholder="Password"
            />
          </label>

          <div className="block px-8">
            <button
              onClick={onSubmit}
              className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
            >
              <span className="text-center text-lg font-medium tracking-wider text-white">
                LOGIN
              </span>
            </button>
          </div>
          <div className="-mt-8 inline-flex w-full items-center justify-center gap-2 text-center text-xs font-light">
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
                href="/"
                className="tracking-tighter text-primary-red"
              >
                Forgot Password?
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
