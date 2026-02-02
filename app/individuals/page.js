import { CheckCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CleanForIndividuals() {
  return (
    <div className="mt-16 min-h-screen bg-gray-50 px-3 2xs:px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10">
      <section className="py-8 2xs:py-10 xs:py-12 md:py-16">
        <div className="mx-auto px-1 2xs:px-2 xs:px-3 md:container md:px-4">
          <h1 className="mb-3 2xs:mb-4 xs:mb-5 md:mb-6 text-center text-xl 2xs:text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
            Discover Freedom, Purpose, and Integrity with CLEAN
          </h1>
          <p className="mb-6 2xs:mb-7 xs:mb-8 md:mb-12 text-center text-sm 2xs:text-base xs:text-lg md:text-xl text-gray-600">
            Break free from sexual struggles and step into the life God designed
            for you.
          </p>

          <h2 className="mb-4 2xs:mb-5 xs:mb-6 text-center text-lg 2xs:text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
            The Two Faces of CLEAN: Your Path to Transformation
          </h2>

          <div className="grid gap-3 2xs:gap-4 xs:gap-5 md:grid-cols-2 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base 2xs:text-lg xs:text-xl md:text-2xl font-semibold text-gray-800">
                  1. The External Face: Freedom from Sexual Struggles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs 2xs:text-sm xs:text-base text-gray-600 leading-relaxed">
                  CLEAN equips you with practical tools to overcome challenges
                  like pornography, masturbation, fornication, adultery, and
                  other forms of sexual sin. No matter how deep your struggle,
                  CLEAN provides the shovel to help you climb out of the hole.
                  Through accountability, community, and proven strategies,
                  you&apos;ll gain the strength to live a life of sexual
                  integrity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base 2xs:text-lg xs:text-xl md:text-2xl font-semibold text-gray-800">
                  2. The Internal Face: Discovering Your God-Given Purpose
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs 2xs:text-sm xs:text-base text-gray-600 leading-relaxed">
                  True transformation goes beyond behavior—it&apos;s about
                  becoming the man God created you to be. When you gain
                  self-control in this critical area of your life, you create
                  space for God to reveal your purpose. CLEAN helps you step out
                  of the mud of sin and into the fullness of your calling.
                  Because purpose is like a white suit—God won&apos;t hand it to
                  you while you&apos;re still covered in dirt.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 md:text-2xl lg:text-3xl">
                Why CLEAN Works for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Proven Tools: Access video devotionals, teaching content, and digital resources designed to guide your journey.",
                  "Supportive Community: Join a network of men who understand your struggles and are committed to growth.",
                  "Flexible Options: Choose a plan that fits your needs—whether you're just starting out or ready to lead others.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                  >
                    <CheckCircle className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <h2 className="mb-6 mt-12 text-center text-2xl font-semibold text-gray-800 md:text-3xl">
            Your <em className="font-bold not-italic text-primary-red">CLEAN</em>{" "}
            Journey Starts Here
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "CLEAN Starter",
                price: "Coming Soon",
                features: [
                  "Explore introductory resources and join a public community forum.",
                  "Get weekly email newsletters with tips, encouragement, and updates.",
                ],
              },
              {
                title: "CLEAN Essentials",
                price: "$99",
                features: [
                  "Dive deeper with self-paced learning, full access to resources, and optional coaching.",
                  "Join a private online community and participate in monthly live Q&A sessions.",
                ],
              },
              {
                title: "CLEAN Leadership",
                price: "Coming Soon",
                features: [
                  "Equip yourself to lead and disciple others in your church or community.",
                ],
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className="flex flex-col md:py-4 lg:py-12"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800 md:text-2xl lg:text-3xl">
                    {plan.title}
                  </CardTitle>
                  <p
                    className={cn(
                      "indent-2 text-base font-semibold text-primary-red md:text-xl",
                      plan.price.startsWith("$") &&
                        "indent-1 text-xl font-extrabold md:text-3xl",
                    )}
                  >
                    {plan.price}
                  </p>
                </CardHeader>
                <CardContent className="grow">
                  <ul className="space-y-2 text-gray-600">
                    {plan.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-start"
                      >
                        <CheckCircle2 className="mr-2 h-5 w-5 shrink-0 text-primary-red" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800 lg:text-4xl">
              Take the first step toward transformation. Join CLEAN today!
            </h2>
            <Button
              size="lg"
              asChild
              className="bg-primary-red hover:bg-red-800"
            >
              <Link href="/signup">Start Your Journey Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
