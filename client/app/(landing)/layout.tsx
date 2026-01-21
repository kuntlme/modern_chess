import Container from "@/feature/landing/components/Container";
import Navbar from "@/feature/landing/components/navbar";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-black">
      <div className="absolute inset-0 bg-linear-to-br from-amber-950/30 via-transparent to-transparent text-xl"></div>
      {children}
    </div>
  );
};

export default LandingLayout;
