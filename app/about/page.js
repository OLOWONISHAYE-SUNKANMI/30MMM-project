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
      <section className="relative bg-primary-red pt-16 text-white">
        <div className="container relative mx-auto px-8 pt-16">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 mt-8 text-5xl font-bold">About CLEAN</h1>
            <p className="text-xl leading-relaxed">
              CLEAN exists to help men find freedom, purpose, and brotherhood.
              We believe that every man has the potential to live a life of
              integrity and impact, but too often, struggles with sexual sin and
              lack of purpose hold men back from becoming who God created them
              to be.
            </p>
            <p className="mt-8 pb-16 text-2xl font-semibold">
              CLEAN is here to change that.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-16">
        <div className="auto container">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-8 text-center text-3xl font-bold">Our Mission</h2>
            <div className="space-y-8">
              <div className="rounded-lg bg-gray-50 p-8">
                <h3 className="mb-8 text-xl font-semibold">External Freedom</h3>
                <p className="text-gray-700">
                  To help men break free from the chains of sexual sin by
                  equipping them with the tools and community they need to climb
                  out of any hole—no matter how deep it may seem.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-8">
                <h3 className="mb-8 text-xl font-semibold">Internal Purpose</h3>
                <p className="text-gray-700">
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
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 text-black">
        <div className="container mx-auto">
          <motion.div
            {...fadeIn}
            className="mx-auto w-full"
          >
            <h2 className="mb-16 text-center text-3xl font-bold">Why CLEAN?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {statistics.map((item, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="mb-4 text-4xl font-bold text-primary-red">
                    {item.stat}
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-center text-lg">
              CLEAN fills this gap by providing practical tools, biblical
              teaching, and a supportive community to help men find lasting
              freedom and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-4xl"
          >
            <h2 className="mb-12 text-center text-3xl font-bold">
              Our Approach
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {corePrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-6"
                >
                  <h3 className="mb-4 text-xl font-semibold">
                    {principle.title}
                  </h3>
                  <p className="text-gray-700">{principle.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-8 text-3xl font-bold">Our Vision</h2>
            <p className="mb-8 text-xl leading-relaxed">
              We envision a world where men lead with integrity, families are
              restored, and churches become places of healing and
              transformation. CLEAN is more than a program — it&apos;s a
              movement to equip men and churches to address the challenges of
              sexual sin and betrayal trauma with grace and truth.
            </p>
            <div className="mt-12">
              <h3 className="mb-4 text-2xl font-bold">Join Us</h3>
              <p className="mb-8 text-lg">
                Whether you&apos;re a man seeking freedom, a church leader
                looking for resources, or someone who wants to support this
                mission, CLEAN has a place for you. Together, we can build true
                brotherhood and help men step into their God-given purpose.
              </p>
              <Link
                href="/Pricing"
                className="mt-10 rounded-md bg-primary-red px-8 py-3 text-white transition-colors hover:bg-red-700"
              >
                Start Your Journey
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
