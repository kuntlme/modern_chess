"use client";
import { useCurrentUser } from "@/feature/auth/hooks/use-current-user";
import Container from "@/feature/landing/components/Container";
import FeatureCards from "@/feature/landing/components/feature";
import Footer from "@/feature/landing/components/footer";
import HeroSection from "@/feature/landing/components/hero";
import Navbar from "@/feature/landing/components/navbar";

export default function Home() {
  const currentUser = useCurrentUser();
  return (
    <div className="w-full h-full min-h-screen">
      <Container className="p-5">
        <Navbar />
      </Container>
      <HeroSection />
      <div className="flex items-center justify-center mt-20">
        <div className="w-full h-px bg-linear-to-r from-transparent to-cyan-500"></div>
        <div className="border border-cyan-500 p-2 rounded-full">
          <div className="size-3 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
        <div className="w-full h-px bg-linear-to-r from-cyan-500 to-transparent"></div>
      </div>
      <FeatureCards />
      <div className="border-t border-dashed border-neutral-500/40">
        <Footer />
      </div>
    </div>
  );
}
