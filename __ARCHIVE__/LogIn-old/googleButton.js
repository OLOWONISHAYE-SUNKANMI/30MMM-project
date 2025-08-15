import React from "react";
import Image from "next/image";

export default function GoogleButton() {
  return (
    <>
      <button className="mx-auto my-4 flex w-5/6 columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 outline outline-1 outline-[#af3634]">
        <Image
          className="overflow-x-clip object-cover contain-layout"
          src="/googlelogo.png"
          alt={"google logo"}
          width={20}
          height={20}
        />
        <div className="text-lg font-semibold text-[#af3634]">
          Login with Google
        </div>
      </button>
    </>
  );
}
