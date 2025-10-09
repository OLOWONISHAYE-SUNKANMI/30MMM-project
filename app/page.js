"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { AboutSection } from "@/components/Landing/about-section";
import { ChurchRoleSection } from "@/components/Landing/church-role-section";
import { CTASection } from "@/components/Landing/cta-section";
import { HeroSection } from "@/components/Landing/hero-section";
// import { ResourcesSection } from "@/components/Landing/resources-section"; --> TO DO: keeping for future implementation
import { TestimonialsSection } from "@/components/Landing/testimonials-section";
import { TwoFacesSection } from "@/components/Landing/two-faces-section";

// Dynamically import MetricsDashboard to reduce initial load time
const MetricsDashboard = dynamic(
  () => import("@/components/Landing/metrics-dashboard"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

export default function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Head>
        <title>Thirty Mighty Men Ministries</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div className="min-h-screen">
        <HeroSection />
        <TwoFacesSection id="TwoFaces" />
        <ChurchRoleSection isMobile={isMobile} />
        {!isMobile && <MetricsDashboard />}
        {/* DO NOT DELETE -  This component will be restored in a future version */}
        {/* <ResourcesSection isMobile={isMobile} /> */}
        <AboutSection isMobile={isMobile} />
        <TestimonialsSection isMobile={isMobile} />
        <CTASection />
      </div>
    </>
  );
}
