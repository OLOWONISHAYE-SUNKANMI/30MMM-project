import { YouTubeEmbed } from "@next/third-parties/google";
import Link from "next/link";

export function ChurchRoleSection() {
  return (
    <section className="bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="mx-auto px-4 sm:px-6 md:container">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Left Column: Content */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-primary">
                The Church's Role in Healing
              </h2>
              <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">
                Why CLEAN Matters
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-semibold">The Problem</h4>
              <p className="text-muted-foreground text-sm sm:text-base">
                Pornography is one of the most pervasive and damaging issues
                facing men and families today. Yet churches are struggling to
                address it effectively.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Only 9% of pastors say their church has a program to address
                  pornography—up just 2% since 2015.
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Pornography consumption continues to rise, yet churches have
                  made little progress in equipping leaders and congregants.
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  For every porn user, there's a partner experiencing
                  betrayal trauma, but most churches lack support programs.
                </li>
              </ul>
              <p className="text-xs sm:text-sm italic text-muted-foreground">
                Who else but the church can address this issue with grace,
                truth, and lasting impact?
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-semibold">The Solution: CLEAN</h4>
              <p className="text-muted-foreground text-sm sm:text-base">
                The CLEAN program empowers churches to:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-green-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Break the silence around pornography and betrayal trauma.
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-green-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Equip leaders with tools to address this issue effectively.
                </li>
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-green-500 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Restore families and strengthen communities.
                </li>
              </ul>
            </div>

            <div className="pt-3 sm:pt-4">
              <Link
                href="/individuals"
                className="inline-flex items-center rounded-md bg-primary-red px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 transition-colors"
              >
                Get Started Now
              </Link>
            </div>
          </div>

          {/* Right Column: Video and Stats */}
          <div className="space-y-4 sm:space-y-6">
            <YouTubeEmbed videoId={"3reik8Pkt60"} />
            <div className="rounded-lg bg-white p-4 sm:p-6 shadow-md">
              <h4 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Impact of CLEAN</h4>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                Churches with programs like CLEAN are{" "}
                <span className="font-bold text-primary-red">
                  four times more likely
                </span>{" "}
                to help men overcome pornography.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                CLEAN integrates counseling, community engagement, and
                accountability to address the complex realities of sexual
                struggles.
              </p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <Link
                href="https://www.barna.com/trends/church-and-porn/"
                className="hover:underline"
              >
                Source: Barna Research
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
