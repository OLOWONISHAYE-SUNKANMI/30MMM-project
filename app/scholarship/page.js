"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScholarshipPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        CLEAN for All Scholarship Program
      </h1>

      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
          <p className="mb-4">
            At CLEAN, we believe that personal growth and transformation should
            be accessible to all men, regardless of their financial situation.
            That&apos;s why we&apos;ve created the &quot;CLEAN for All&quot;
            Scholarship Program.
          </p>
          <p className="mb-4">
            For every 9 paid accounts, we award one scholarship to a participant
            who cannot afford the program but demonstrates a strong commitment
            to personal growth.
          </p>

          <Button
            variant="default"
            asChild
          >
            <Link href="/scholarship-application">
              Apply for a Scholarship{" "}
            </Link>
          </Button>
        </div>
        <div>
          <Image
            src="/jesus_hero.png"
            alt="Men supporting each other"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>

      <h2 className="mb-4 text-2xl font-semibold">
        Benefits of Our Scholarship Program
      </h2>
      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Increased Accessibility",
            description:
              "Ensures that financial barriers don't prevent men from participating in CLEAN.",
          },
          {
            title: "Community Building",
            description:
              "Encourages paid participants to feel part of a larger mission and support others.",
          },
          {
            title: "Positive Impact",
            description:
              "Demonstrates our commitment to inclusivity and giving back to the community.",
          },
        ].map((benefit, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div
        id="apply"
        className="mb-12 rounded-lg bg-gray-100 p-8"
      >
        <h2 className="mb-4 text-2xl font-semibold">How to Apply</h2>
        <ol className="mb-4 list-inside list-decimal space-y-2">
          <li>
            Submit a brief form explaining your financial need and why you want
            to join CLEAN.
          </li>
          <li>Our selection committee will review your application.</li>
          <li>
            If selected, you&apos;ll receive full access to the CLEAN Essentials
            tier or higher.
          </li>
        </ol>

        <Button
          variant="link"
          asChild
        >
          <Link href="/scholarship-application">Start Your Application</Link>
        </Button>
      </div>

      <div className="text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Support the Scholarship Program
        </h2>
        <p className="mb-4">
          By joining CLEAN or contributing to our &quot;Pay It Forward&quot;
          option, you&apos;re not only investing in your own growth but also
          helping provide scholarships for men in need. Please comment
          &quot;Scholarship&quot; on the donation to ensure this donation counts
          towards helping other men grow in Christ.
        </p>

        <Button
          variant="outline"
          asChild
        >
          <Link href="/donate">Contribute to Scholarships</Link>
        </Button>
      </div>
    </div>
  );
}
