import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import YouTubeVideo from "./YouTubeVideoPlayerv2";

export function AboutSection() {
  return (
    <section className="bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="mx-auto px-4 sm:px-6 md:container">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left Column: Video and Brief Intro */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              About Thirty Mighty Men Ministries
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl italic text-primary">
              30MMM: A Ministry for Men, by Men
            </p>
            <YouTubeVideo videoId="tXCZLYmgmVc" />
            <div className="flex items-center text-sm">
              For more videos, visit our{" "}
              <Link
                href="//linktr.ee/30mmm"
                className="ml-2 text-primary underline transition-colors duration-200 hover:text-primary/80"
              >
                Linktree
              </Link>
            </div>
          </div>

          {/* Right Column: Ministry Description */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold">
              WATCH THE SERMON THAT STARTED IT ALL
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base">
              Discover the heart behind Thirty Mighty Men Ministries and the
              transformative CLEAN program. In this powerful sermon delivered at
              King's City Church in Houston, TX, led by Pastor Dayo, Dr.
              Donovan Anderson shares the vision and mission that drive our
              ministry.
            </p>

            <p className="text-muted-foreground text-sm sm:text-base">
              This video offers a firsthand look at the principles and practices
              that make CLEAN a life-changing experience for men. If you're
              curious about how we help men rise above challenges and embrace a
              life of purpose, this is a must-watch.
            </p>

            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-semibold">
                Ready to see the impact of CLEAN?
              </h4>
              <p className="flex items-center gap-2 font-semibold text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" /> Watch the Video Now
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/founders-bio"
                className="inline-flex items-center rounded-md bg-primary px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Read Full Bio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
