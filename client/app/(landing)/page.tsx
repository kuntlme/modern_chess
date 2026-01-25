"use client";
import { useCurrentUser } from "@/feature/auth/hooks/use-current-user";
import Container from "@/feature/landing/components/Container";
import FeatureCards from "@/feature/landing/components/feature";
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
      <FeatureCards />
    </div>
  );
}
