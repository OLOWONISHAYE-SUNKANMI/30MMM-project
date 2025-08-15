import React from "react";

export default function Divider() {
  return (
    <div className="flex w-full items-center gap-x-5 px-10 md:my-2 md:px-52">
      <hr className="border-1 w-2/6 flex-auto border-gray-300" />
      <p className="text-base text-black">or</p>
      <hr className="border-1 w-2/6 flex-auto border-gray-300" />
    </div>
  );
}
