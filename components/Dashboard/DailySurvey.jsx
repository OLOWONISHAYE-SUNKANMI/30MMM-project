"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function DailySurvey({ userProgress, userInfo }) {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="rounded bg-primary-red px-4 py-2 text-white">
            Daily Survey
          </button>
        </SheetTrigger>
        <SheetContent className="z-51 w-[299px] overflow-clip sm:w-[320px]">
          <SheetHeader>
            <SheetTitle>Daily Survey</SheetTitle>
            <SheetDescription>
              {/* Help us improve our app by answering a few questions. */}
              Hello
            </SheetDescription>
          </SheetHeader>
          <Image
            src="/survey-placeholder.png"
            alt="Survey"
            width={312}
            height={1488}
            className="object-cover"
          />
          <SheetFooter>
            <button className="rounded bg-primary-red px-4 py-2 text-white">
              Submit
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
