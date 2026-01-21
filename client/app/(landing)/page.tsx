"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/feature/auth/hooks/use-current-user";
import Container from "@/feature/landing/components/Container";
import HeroSection from "@/feature/landing/components/hero";
import LandingChessBoard from "@/feature/landing/components/landing-chessboard";
import Navbar from "@/feature/landing/components/navbar";
import Image from "next/image";
import { Chessboard } from "react-chessboard";

export default function Home() {
  const currentUser = useCurrentUser();
  return (
    <div className="w-full h-full min-h-screen">
      <Container className="p-5">
        <Navbar />
      </Container>
      <HeroSection />
    </div>
  );
}
