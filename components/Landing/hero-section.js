"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoBackground from "./VideoBackground";

export function HeroSection() {
  const videoSources = ["/videos/CLEAN HERO VIDEO- LATEST.mp4"];

  return (
    <section className="relative mt-16 sm:mt-20 flex min-h-dvh w-full flex-col justify-end text-center after:absolute after:inset-0 after:bg-black/20">
      <VideoBackground videoSources={videoSources} />

      <div className="container relative z-10 mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-24 px-4 sm:px-6 md:text-white">
        {/* Hero Text */}
        <p className="
          relative mx-auto mb-4 sm:mb-6 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-3xl
          animate-shimmer
          bg-linear-to-b from-yellow-50 via-yellow-400 to-amber-100
          bg-clip-text text-transparent bg-blend-hue
          italic drop-shadow-[0_25px_25px_rgba(0,0,0,0.75)]
          before:absolute before:inset-0 before:bg-white before:bg-clip-text
          text-sm leading-relaxed
          xs:text-base
          sm:text-lg sm:leading-relaxed
          md:text-xl md:leading-relaxed
          lg:text-2xl lg:leading-relaxed
          xl:text-3xl xl:leading-relaxed
          2xl:text-4xl 2xl:font-medium
        ">
          Discover your purpose and grow into the man God designed you to be.
        </p>

        {/* CTA Buttons */}
        <div className="
          flex flex-col items-center gap-2 xs:gap-3
          sm:flex-row sm:justify-center sm:gap-3 md:gap-4
        ">
          <Link href="/individuals" className="w-full xs:w-auto sm:w-auto">
            <Button className="w-full xs:w-auto sm:w-auto min-w-[140px] bg-primary-red text-white drop-shadow-md hover:bg-red-500 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
              For Individuals
            </Button>
          </Link>

          <Link href="/churches" className="w-full xs:w-auto sm:w-auto">
            <Button className="w-full xs:w-auto sm:w-auto min-w-[140px] bg-accent-red text-white drop-shadow-md hover:bg-red-500 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
              For Churches
            </Button>
          </Link>

          <button
            className="
              group inline-flex items-center justify-center gap-2
              rounded-lg bg-almost-black
              px-4 py-2 sm:px-6 sm:py-3 text-white drop-shadow-md
              transition-transform hover:-translate-y-1 hover:bg-gray-800
              w-full xs:w-auto sm:w-auto min-w-[140px]
              text-sm sm:text-base
            "
            onClick={() => {
              document
                .getElementById("TwoFaces")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="font-medium">Learn More</span>
            <span className="animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
