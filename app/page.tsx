import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import RoofProcess from "@/components/RoofProcess";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Materials from "@/components/Materials";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Calculator from "@/components/Calculator";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Gallery />
      <RoofProcess />
      <WhyUs />
      <Process />
      <Materials />
      <Reviews />
      <Contact />
      <Calculator />
      <FinalCta />
    </>
  );
}
