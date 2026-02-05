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
    <div className="h-full min-h-screen w-full">
      <Container className="p-5">
        <Navbar />
      </Container>
      <HeroSection />
      <div className="mt-20 flex items-center justify-center">
        <div className="h-px w-full bg-linear-to-r from-transparent to-cyan-500"></div>
        <div className="rounded-full border border-cyan-500 p-2">
          <div className="size-3 animate-pulse rounded-full bg-cyan-400"></div>
        </div>
        <div className="h-px w-full bg-linear-to-r from-cyan-500 to-transparent"></div>
      </div>
      <FeatureCards />
      <div className="border-t border-dashed border-neutral-500/40">
        <Footer />
      </div>
    </div>
  );
}
