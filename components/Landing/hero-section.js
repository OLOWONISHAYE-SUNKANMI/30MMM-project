"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoBackground from "./VideoBackground";

// Replacing the classNames in the first p element will bring in the shimmer text:
// "max-w-3xl relative before:absolute before:inset-0 before:bg-white before:bg-clip-text bg-blend-hue  mx-auto mb-8 text-lg italic text-transparent bg-gradient-to-b from-yellow-50 via-yellow-400 to-amber-100 animate-shimmer bg-clip-text drop-shadow-[0_35px_35px_rgba(0,0,0,0.75)] sm:text-xl md:text-2xl lg:text-3xl lg:font-medium xl:text-4xl"
// original: "max-w-3xl mx-auto mb-8 text-lg italic text-black drop-shadow-xl sm:text-xl md:text-2xl md:text-white lg:text-3xl"

export function HeroSection() {
  const videoSources = ["/videos/CLEAN HERO VIDEO- LATEST.mp4"];

  return (
    <section className="relative mt-[85px] flex min-h-[100dvh] w-full flex-col justify-end text-center after:absolute after:inset-0 after:bg-black/15">
      <VideoBackground videoSources={videoSources} />
      <div className="container relative z-10 mx-auto mb-24 px-4 md:text-white">
        <p className="relative mx-auto mb-8 max-w-3xl animate-shimmer bg-gradient-to-b from-yellow-50 via-yellow-400 to-amber-100 bg-clip-text text-lg italic text-transparent bg-blend-hue drop-shadow-[0_35px_35px_rgba(0,0,0,0.75)] before:absolute before:inset-0 before:bg-white before:bg-clip-text sm:text-xl md:text-2xl lg:text-3xl lg:font-medium xl:text-4xl">
          Discover your purpose and grow into the man God designed you to be.
        </p>
        <div className="space-x-3">
          <Link href="/individuals">
            <Button className="bg-primary-red text-white drop-shadow-md hover:bg-red-500">
              For Individuals
            </Button>
          </Link>
          <Link href="/churches">
            <Button className="bg-accent-red text-white drop-shadow-md hover:bg-red-500">
              For Churches
            </Button>
          </Link>
          <button
            className="group inline-flex flex-row items-center gap-2 rounded-lg bg-almost-black px-2 py-2 text-white drop-shadow-md transition-transform hover:-translate-y-1 hover:bg-gray-800"
            onClick={() => {
              document
                .getElementById("TwoFaces")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-base font-medium text-white">Learn More</span>
            <span className="animate-bounce text-white">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
