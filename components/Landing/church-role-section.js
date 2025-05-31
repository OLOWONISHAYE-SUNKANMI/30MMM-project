import Link from "next/link";
import YouTubeVideo from "./YouTubeVideoPlayerv2";

export function ChurchRoleSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column: Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                The Church&apos;s Role in Healing
              </h2>
              <h3 className="mt-2 text-3xl font-bold md:text-4xl">
                Why CLEAN Matters
              </h3>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold">The Problem</h4>
              <p className="text-muted-foreground">
                Pornography is one of the most pervasive and damaging issues
                facing men and families today. Yet churches are struggling to
                address it effectively.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 shrink-0 text-red-500"
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
                    className="mr-2 h-5 w-5 shrink-0 text-red-500"
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
                    className="mr-2 h-5 w-5 shrink-0 text-red-500"
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
                  For every porn user, there&apos;s a partner experiencing
                  betrayal trauma, but most churches lack support programs.
                </li>
              </ul>
              <p className="text-sm italic text-muted-foreground">
                Who else but the church can address this issue with grace,
                truth, and lasting impact?
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold">The Solution: CLEAN</h4>
              <p className="text-muted-foreground">
                The CLEAN program empowers churches to:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <svg
                    className="mr-2 h-5 w-5 shrink-0 text-green-500"
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
                    className="mr-2 h-5 w-5 shrink-0 text-green-500"
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
                    className="mr-2 h-5 w-5 shrink-0 text-green-500"
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

            <div className="pt-4">
              <Link
                href="/SignUp"
                className="inline-flex items-center rounded-md bg-primary-red px-6 py-3 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2"
              >
                Get Started Now
              </Link>
            </div>
          </div>

          {/* Right Column: Video and Stats */}
          <div className="space-y-6">
            <YouTubeVideo videoId="3reik8Pkt60" />
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h4 className="mb-4 text-lg font-semibold">Impact of CLEAN</h4>
              <p className="mb-4 text-sm text-muted-foreground">
                Churches with programs like CLEAN are{" "}
                <span className="font-bold text-primary-red">
                  four times more likely
                </span>{" "}
                to help men overcome pornography.
              </p>
              <p className="text-sm text-muted-foreground">
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
