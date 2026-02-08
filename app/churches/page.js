import { CheckCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CleanForChurches() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* Hero Section */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl">
              CLEAN Packages for Churches: Find the Right Fit for Your Ministry
            </h1>
            <p className="mb-8 text-base text-gray-600 sm:mb-10 sm:text-lg md:mb-12 md:text-xl">
              Equip your men to lead with integrity, restore families, and build
              stronger communities with CLEAN. Choose the package that best fits
              your church&apos;s needs.
            </p>
          </div>

          {/* Why CLEAN Card */}
          <Card className="mb-12 sm:mb-16">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 sm:text-2xl">
                Why CLEAN for Churches?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base text-gray-600 sm:text-lg">
                Pornography and sexual sin are among the most pervasive issues
                facing men and families today. Yet, many churches struggle to
                address these challenges effectively. CLEAN provides your church
                with the tools, resources, and support to:
              </p>
              <ul className="space-y-3">
                {[
                  "Break the Silence: Equip your leaders to address pornography and betrayal trauma with grace and truth.",
                  "Restore Families: Help men overcome sexual struggles and rebuild trust in their relationships.",
                  "Build Stronger Communities: Foster authentic brotherhood and discipleship within your church.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mt-1 mr-3 h-5 w-5 shrink-0 text-green-500 sm:h-6 sm:w-6" />
                    <span className="text-sm text-gray-600 sm:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-base text-gray-600 sm:text-lg">
                With CLEAN, your church can become a place where men find
                freedom, purpose, and transformation.
              </p>
            </CardContent>
          </Card>

          {/* Packages Section */}
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 sm:text-2xl md:text-3xl">
              Explore CLEAN Packages for Churches
            </h2>
            <p className="mb-8 text-sm text-gray-600 sm:mb-10 sm:text-base md:mb-12">
              CLEAN offers flexible packages designed to meet your church&apos;s
              unique goals, size, and budget. Whether you&apos;re just starting
              out or ready to transform your entire men&apos;s ministry, we have
              a solution for you.
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "CLEAN Essentials",
                description:
                  "Ideal for churches new to CLEAN or with limited resources.",
                features: [
                  "Self-Paced Learning: Complete the 5-week devotional journey at your own pace.",
                  "Full Access to Resources: Video devotionals and digital book.",
                  "Private Online Community: Join a supportive network of like-minded men.",
                  "Monthly Live Q&A: Participate in recorded live sessions with CLEAN leaders.",
                ],
                perfect:
                  "Churches looking to introduce CLEAN to their men's ministry with minimal upfront investment.",
              },
              {
                title: "CLEAN Leadership",
                description:
                  "Designed for churches ready to equip leaders and sustain a thriving men's ministry.",
                features: [
                  "Advanced Training: Learn how to recruit, train, and disciple leaders within your church.",
                  "Live Group Coaching: Participate in synchronous small group sessions for real-time interaction and support.",
                  "Proven Resources: Video devotionals and digital book.",
                  "Community Support: Join a private online community for networking and encouragement or establish your own.",
                  "Monthly Live Q&A: Participate in recorded live sessions with CLEAN leaders.",
                ],
                perfect:
                  "Churches with an existing men's ministry looking to deepen their impact and leadership capacity.",
              },
              {
                title: "CLEAN Vessels",
                description:
                  "An exclusive, high-touch program for churches ready to transform their men's ministry.",
                features: [
                  "Customized Approach: Tailored strategies to fit your church's unique needs.",
                  "Proven Results: Grow attendance, tithing, and volunteerism through authentic brotherhood.",
                  "Leadership Development: Equip men to disciple others and sustain the ministry long-term.",
                  "Exclusive Access: Live sessions with Donovan Anderson and personalized coaching from the program creator.",
                ],
                perfect:
                  "Churches committed to building a men's ministry that transforms lives and impacts their community.",
              },
            ].map((data, index) => (
              <Card key={index} className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 sm:text-xl">
                    {data.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-gray-600 sm:text-base">
                    {data.description}
                  </p>
                  <ul className="space-y-3">
                    {data.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <CheckCircle2 className="mt-1 mr-3 h-5 w-5 shrink-0 text-primary-red" />
                        <span className="text-xs text-gray-600 sm:text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-semibold text-gray-700 sm:text-sm">
                    Perfect for: {data.perfect}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Consultation Card */}
          <Card className="mt-12 sm:mt-16">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 sm:text-2xl">
                Not Sure Which Package Is Right for You?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base text-gray-600 sm:text-lg">
                Every church is unique, and we&apos;re here to help you find the
                perfect fit. During your free consultation, we&apos;ll:
              </p>
              <ul className="space-y-3">
                {[
                  "Discuss your church's specific needs and goals.",
                  "Explore how CLEAN can help your men's ministry thrive.",
                  "Recommend the best package for your church.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mt-1 mr-3 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-base text-gray-600 sm:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-base text-gray-600 sm:text-lg">
                Take the first step toward transforming your men&apos;s
                ministry. Schedule your free consultation today!
              </p>
              <div className="flex justify-center">
                <Link
                  href="https://calendar.app.google/mhsKtSg2NA3Bj8qC7"
                  target="_blank"
                  className="inline-flex"
                >
                  <Button className="w-full bg-primary-red hover:bg-red-800 sm:w-auto">
                    Book a Time Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Impact Card */}
          <Card className="mt-12 sm:mt-16">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 sm:text-2xl">
                The Impact of CLEAN
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base text-gray-600 sm:text-lg">
                Churches with CLEAN are{" "}
                <span className="font-bold text-primary-red">
                  4x more likely
                </span>{" "}
                to help men overcome pornography and sexual struggles.
                Here&apos;s what others are saying:
              </p>
              <div className="space-y-4">
                <blockquote className="rounded-lg bg-gray-100 p-4 italic text-gray-600 sm:p-6">
                  &quot;CLEAN has transformed our men&apos;s ministry. Men are
                  opening up, seeking help, and finding freedom like never
                  before.&quot;
                  <footer className="mt-3 text-sm font-semibold">
                    – Pastor John Doe, Zion Church
                  </footer>
                </blockquote>
                <blockquote className="rounded-lg bg-gray-100 p-4 italic text-gray-600 sm:p-6">
                  &quot;The CLEAN program gave me the tools and support I needed
                  to break free from pornography and rebuild trust with my
                  wife.&quot;
                  <footer className="mt-3 text-sm font-semibold">
                    – CLEAN Participant
                  </footer>
                </blockquote>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Card */}
          <Card className="mt-12 sm:mt-16">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 sm:text-2xl">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-6">
                {[
                  {
                    q: "How long does it take to implement CLEAN in our church?",
                    a: "The timeline varies based on your church's needs, but most churches are ready to launch within 4-6 weeks of starting the process.",
                  },
                  {
                    q: "Is CLEAN affordable for smaller churches?",
                    a: "Yes! CLEAN offers flexible pricing and scholarship opportunities to ensure every church can participate.",
                  },
                  {
                    q: "What kind of support will our church receive?",
                    a: "Your church will have access to training, resources, and ongoing coaching to ensure the success of your men's ministry.",
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <dt className="text-lg font-semibold text-gray-800">
                      {item.q}
                    </dt>
                    <dd className="text-base text-gray-600">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="mt-12 text-center sm:mt-16">
            <h2 className="mb-6 text-xl font-semibold text-gray-800 sm:text-2xl md:text-3xl">
              Ready to Make an Impact?
            </h2>
            <Button
              size="lg"
              className="bg-primary-red hover:bg-red-800"
              asChild
            >
              <Link
                target="_blank"
                href="https://calendar.app.google/mhsKtSg2NA3Bj8qC7"
              >
                Schedule a Free Consultation Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}