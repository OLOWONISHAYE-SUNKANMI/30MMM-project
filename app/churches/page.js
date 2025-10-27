import { CheckCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CleanForChurches() {
  return (
    <div className="min-h-screen px-10 mt-16 bg-gray-50">
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-800 md:text-4xl md:mb-6">
            CLEAN Packages for Churches: Find the Right Fit for Your Ministry
          </h1>
          <p className="mb-8 text-lg text-center text-gray-600 md:text-xl md:mb-12">
            Equip your men to lead with integrity, restore families, and build
            stronger communities with CLEAN. Choose the package that best fits
            your church&apos;s needs.
          </p>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Why CLEAN for Churches?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Pornography and sexual sin are among the most pervasive issues
                facing men and families today. Yet, many churches struggle to
                address these challenges effectively. CLEAN provides your church
                with the tools, resources, and support to:
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  "Break the Silence: Equip your leaders to address pornography and betrayal trauma with grace and truth.",
                  "Restore Families: Help men overcome sexual struggles and rebuild trust in their relationships.",
                  "Build Stronger Communities: Foster authentic brotherhood and discipleship within your church.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-gray-600">
                With CLEAN, your church can become a place where men find
                freedom, purpose, and transformation.
              </p>
            </CardContent>
          </Card>

          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800 md:text-3xl">
            Explore CLEAN Packages for Churches
          </h2>
          <p className="mb-8 text-center text-gray-600">
            CLEAN offers flexible packages designed to meet your church&apos;s
            unique goals, size, and budget. Whether you&apos;re just starting
            out or ready to transform your entire men&apos;s ministry, we have a
            solution for you.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
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
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {data.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grow">
                  <p className="mb-4 text-gray-600">{data.description}</p>
                  <ul className="mb-4 space-y-2 text-gray-600">
                    {data.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-primary-red shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-gray-700">
                    Perfect for: {data.perfect}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Not Sure Which Package Is Right for You?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Every church is unique, and we&apos;re here to help you find the
                perfect fit. During your free consultation, we&apos;ll:
              </p>
              <ul className="mb-6 space-y-2 text-gray-600">
                {[
                  "Discuss your church's specific needs and goals.",
                  "Explore how CLEAN can help your men's ministry thrive.",
                  "Recommend the best package for your church.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-6 text-gray-600">
                Take the first step toward transforming your men&apos;s
                ministry. Schedule your free consultation today!
              </p>
              <Link
                href="https://calendar.app.google/mhsKtSg2NA3Bj8qC7"
                target="_blank"
              >
                <Button className="w-full md:w-auto bg-primary-red hover:bg-red-800">
                  Book a Time Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                The Impact of CLEAN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Churches with CLEAN are{" "}
                <span className="font-bold text-primary-red">
                  4x more likely
                </span>{" "}
                to help men overcome pornography and sexual struggles.
                Here&apos;s what others are saying:
              </p>
              <blockquote className="p-4 mb-4 italic text-gray-600 bg-gray-100 rounded">
                &quot;CLEAN has transformed our men&apos;s ministry. Men are
                opening up, seeking help, and finding freedom like never
                before.&quot;
                <footer className="mt-2 text-sm font-semibold">
                  – Pastor John Doe, Zion Church
                </footer>
              </blockquote>
              <blockquote className="p-4 italic text-gray-600 bg-gray-100 rounded">
                &quot;The CLEAN program gave me the tools and support I needed
                to break free from pornography and rebuild trust with my
                wife.&quot;
                <footer className="mt-2 text-sm font-semibold">
                  – CLEAN Participant
                </footer>
              </blockquote>
            </CardContent>
          </Card>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
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
                  <div key={index}>
                    <dt className="font-semibold text-gray-800">{item.q}</dt>
                    <dd className="mt-1 text-gray-600">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Ready to Make an Impact?
            </h2>
            <Button size="lg" asChild>
              <Link
                target="_blank"
                href="https://calendar.app.google/mhsKtSg2NA3Bj8qC7"
                className=" bg-primary-red hover:bg-red-800"
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
