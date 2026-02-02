"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function FounderBio() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const Timeline = ({ children }) => (
    <div className="ml-2 sm:ml-4 space-y-4 sm:space-y-6 border-l-2 border-primary-red pl-4 sm:pl-6">
      {children}
    </div>
  );

  const TimelineItem = ({ year, title, children }) => (
    <div className="relative">
      <div className="absolute -left-[1.5rem] sm:-left-[2.19rem] h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-primary-red" />
      <div>
        {year && <span className="text-xs sm:text-sm text-gray-500">{year}</span>}
        <h4 className="text-base sm:text-lg font-semibold">{title}</h4>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white mt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-12 sm:py-16 md:py-20 text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <motion.div
            {...fadeIn}
            className="mx-auto flex max-w-4xl flex-col items-center gap-6 sm:gap-8 md:flex-row"
          >
            <div className="mt-8 sm:mt-12 md:mt-16 md:w-1/3">
              <div className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 overflow-hidden rounded-full bg-gray-300 mx-auto">
                <Image
                  src="/donovan.png"
                  alt="Dr. Donovan Anderson"
                  width={256}
                  height={300}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className="text-center md:w-2/3 md:text-left px-4 sm:px-0">
              <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                Dr. Donovan Anderson
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300">
                Visionary Leader and Founder of Thirty Mighty Men Ministries
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-3xl"
          >
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
              Dr. Donovan Anderson is a trailblazer in the fields of ministry,
              academia, and urban development. With a passion for guiding men
              toward lives of obedience, purpose, and brotherhood, he founded 30
              Mighty Men Ministries (30MMM) as a beacon for men seeking
              transformation and empowerment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Academic Journey Section */}
      <section className="bg-gray-50 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl md:text-3xl font-bold">
              Academic Excellence
            </h2>
            <Timeline>
              <TimelineItem
                year="2004"
                title="Bachelor of Arts in History"
              >
                <p className="text-sm sm:text-base text-gray-600">
                  Howard University, magna cum laude
                </p>
              </TimelineItem>
              <TimelineItem
                year="2006"
                title="Master of Arts in History"
              >
                <p className="text-sm sm:text-base text-gray-600">
                  Howard University, magna cum laude
                </p>
              </TimelineItem>
              <TimelineItem
                year="2015"
                title="PhD in City and Regional Planning"
              >
                <p className="text-sm sm:text-base text-gray-600">UNC Chapel Hill</p>
              </TimelineItem>
              <TimelineItem
                year="2024"
                title="Master of Arts in Theology"
              >
                <p className="text-sm sm:text-base text-gray-600">
                  Wesley Theological Seminary, with honors
                </p>
                <div className="mt-2">
                  <p className="font-semibold text-sm sm:text-base">Awards:</p>
                  <ul className="ml-4 list-disc text-gray-600 text-sm sm:text-base">
                    <li>Harry Hoosier Spirit Award</li>
                    <li>Margaret Pittman Award in Urban Ministry</li>
                  </ul>
                </div>
              </TimelineItem>
            </Timeline>
          </motion.div>
        </div>
      </section>

      {/* Ministry Leadership Section */}
      <section className="bg-white py-16">
        <div className="mx-auto px-4 md:container">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-5xl"
          >
            <h2 className="mb-8 text-center text-3xl font-bold">
              Leadership at Zion Church
            </h2>
            <div className="rounded-lg bg-gray-50 p-8">
              <h3 className="mb-4 text-xl font-semibold">
                Lead Shepherd for the Men&apos;s Ministry
              </h3>
              <p className="mb-6 text-gray-700">
                At Zion Church&apos;s Greenbelt Campus, the largest in the Zion
                network, Dr. Anderson built the men&apos;s ministry from the
                ground up, growing it into a vibrant community of over 450 men.
              </p>
              <div className="space-y-4">
                <h4 className="font-semibold">
                  Innovative Programs Developed:
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded bg-white p-4 shadow">
                    <h5 className="font-semibold text-primary-red">CLEAN</h5>
                    <p className="text-sm text-gray-600">
                      Tools to Achieve Sexual Integrity for the Christian Man
                    </p>
                  </div>
                  <div className="rounded bg-white p-4 shadow">
                    <h5 className="font-semibold text-primary-red">
                      Get FIT Bootcamp
                    </h5>
                    <p className="text-sm text-gray-600">
                      Physical and spiritual wellness program
                    </p>
                  </div>
                  <div className="rounded bg-white p-4 shadow">
                    <h5 className="font-semibold text-primary-red">
                      Living Word Bible Study
                    </h5>
                    <p className="text-sm text-gray-600">
                      In-depth Scripture study and application
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            {...fadeIn}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-8 text-center text-3xl font-bold">
              Ministry Journey
            </h2>
            <Timeline>
              <TimelineItem title="Small Group Leader">
                <p className="text-gray-600">6 years at Zion Church</p>
              </TimelineItem>
              <TimelineItem title="Brothers-in-Discipleship Program">
                <p className="text-gray-600">
                  3 years at First Baptist Church of Glenarden
                </p>
              </TimelineItem>
              <TimelineItem title="Training Programs">
                <ul className="ml-4 list-disc text-gray-600">
                  <li>Completed Deacon-in-Training Program at Zion Church</li>
                  <li>Completed Minister-in-Training Program at Zion Church</li>
                </ul>
              </TimelineItem>
            </Timeline>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-primary-red py-8 text-white md:py-16">
        <div className="mx-auto w-[80%] px-4 md:px-4">
          <motion.div
            {...fadeIn}
            className="mx-auto w-full text-center"
          >
            <h2 className="mb-8 text-3xl font-bold">A Vision for the Future</h2>
            <p className="mb-8 text-xl leading-relaxed">
              Dr. Anderson&apos;s vision is clear: to create a world where men
              lead with integrity, families are restored, and communities
              flourish. Through Thirty Mighty Men Ministries, he continues to
              inspire and empower men to become the leaders, husbands, and
              fathers God intended them to be.
            </p>
            <Link href="/Pricing">
              <button className="mt-8 rounded-md bg-white px-8 py-3 text-primary-red transition-colors hover:bg-gray-100">
                Join the Movement
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default FounderBio;
