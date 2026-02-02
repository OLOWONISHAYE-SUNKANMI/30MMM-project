"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  // Animation variants for fade-in effect
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Core principles data
  const corePrinciples = [
    {
      title: "Biblical Foundation",
      description:
        "Every teaching and tool in CLEAN is rooted in Scripture and designed to align with God's truth.",
    },
    {
      title: "Practical Tools",
      description:
        "We provide men with shovels—the practical tools they need to climb out of the holes they find themselves in.",
    },
    {
      title: "Supportive Community",
      description:
        "Brotherhood is at the heart of CLEAN. Men thrive when they are surrounded by others who are on the same journey.",
    },
    {
      title: "Holistic Transformation",
      description:
        "CLEAN is not just about stopping bad habits; it's about building a life of purpose and integrity that glorifies God.",
    },
  ];

  // Statistics data
  const statistics = [
    {
      stat: "9%",
      description:
        "of pastors say their church has a program to address pornography",
    },
    {
      stat: "1:1",
      description:
        "For every porn user, there's a partner experiencing betrayal trauma",
    },
    {
      stat: "100%",
      description:
        "of CLEAN's approach is rooted in biblical truth and practical application",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary-red pt-16 text-white sm:pt-20 md:pt-24 lg:pt-28">
        <div className="relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-4xl text-center lg:max-w-5xl xl:max-w-6xl"
          >
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:mb-8 lg:text-6xl xl:text-7xl">
              About{" "}
              <span className="font-extrabold tracking-wider text-white">
                CLEAN
              </span>
            </h1>
            <div className="space-y-4 px-2 sm:px-4 md:space-y-6 md:px-6">
              <p className="text-base leading-relaxed sm:text-lg md:text-xl lg:text-lg xl:text-xl">
                <span className="font-semibold">CLEAN</span> exists to help men find 
                freedom, purpose, and brotherhood. We believe that every man has the 
                potential to live a life of integrity and impact, but too often, 
                struggles with sexual sin and lack of purpose hold men back from 
                becoming who God created them to be.
              </p>
              <p className="pt-4 text-lg font-semibold sm:pt-6 sm:text-xl md:text-2xl lg:text-3xl">
                CLEAN is here to change that.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-4xl lg:max-w-5xl"
          >
            <h2 className="mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl md:text-5xl lg:mb-16 lg:text-6xl">
              Our Mission
            </h2>
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              <div className="rounded-xl bg-gray-50 p-6 shadow-sm sm:p-8 md:p-10">
                <h3 className="mb-4 text-center text-xl font-semibold sm:mb-6 sm:text-2xl md:text-3xl">
                  External Freedom
                </h3>
                <p className="text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
                  To help men break free from the chains of sexual sin by
                  equipping them with the tools and community they need to climb
                  out of any hole—no matter how deep it may seem.
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-6 shadow-sm sm:p-8 md:p-10">
                <h3 className="mb-4 text-center text-xl font-semibold sm:mb-6 sm:text-2xl md:text-3xl">
                  Internal Purpose
                </h3>
                <p className="text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">
                  To help men discover and step into their God-given purpose. We
                  believe that once men gain self-control in this vital area,
                  they open the door for God to reveal their true purpose. If
                  purpose is like a white suit, God will not hand it to you
                  while you&apos;re living in the mud of sin. CLEAN helps men
                  get out of the mud so they can walk in the fullness of the
                  life God has prepared for them.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-12 text-black sm:py-16 md:py-20">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-6xl"
          >
            <h2 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl md:text-4xl">
              Why CLEAN?
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {statistics.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-white p-6 sm:p-8"
                >
                  <div className="text-center">
                    <div className="mb-3 text-4xl font-bold text-primary-red sm:text-5xl md:text-6xl">
                      {item.stat}
                    </div>
                    <p className="text-base text-gray-600 sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed sm:mt-12 sm:text-lg md:text-xl">
              CLEAN fills this gap by providing practical tools, biblical
              teaching, and a supportive community to help men find lasting
              freedom and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-6xl"
          >
            <h2 className="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl md:text-4xl">
              Our Approach
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {corePrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-gray-50 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02] sm:p-8"
                >
                  <h3 className="mb-4 text-center text-lg font-semibold sm:text-xl md:text-2xl">
                    {principle.title}
                  </h3>
                  <p className="text-center text-base leading-relaxed text-gray-700 sm:text-lg">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            {...fadeIn}
            className="mx-auto flex max-w-4xl flex-col items-center text-center lg:max-w-5xl"
          >
            <h2 className="mb-6 text-3xl font-bold sm:mb-8 sm:text-4xl md:text-5xl">
              Our Vision
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-700 sm:mb-8 sm:text-lg md:text-xl">
              We envision a world where men lead with integrity, families are
              restored, and churches become places of healing and
              transformation. CLEAN is more than a program — it's a
              movement to equip men and churches to address the challenges of
              sexual sin and betrayal trauma with grace and truth.
            </p>
            
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl">
                Join Us!
              </h3>
              <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                Whether you're a man seeking freedom, a church leader
                looking for resources, or someone who wants to support this
                mission, CLEAN has a place for you. Together, we can build true
                brotherhood and help men step into their God-given purpose.
              </p>
            </div>
            
            <Link
              href="/Pricing"
              className="rounded-lg bg-primary-red px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg sm:px-10 sm:py-4 sm:text-lg"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}