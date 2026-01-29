import React from "react";
import Container from "./Container";
import { ChevronRight, Github, Twitter } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

interface Link {
  name: string;
  href: string;
}

const mapLinks: Link[] = [
  {
    name: "FEATURES",
    href: "#",
  },
  {
    name: "LIVE MATCHES",
    href: "#",
  },
  {
    name: "PLAY WITH FRIENDS",
    href: "#",
  },
  {
    name: "GAME ANALYSIS",
    href: "#",
  },
  {
    name: "LEADERBOARDS",
    href: "#",
  },
  {
    name: "FAQs",
    href: "#",
  },
];

const companyLinks: Link[] = [
  {
    name: "HOME",
    href: "#",
  },
  {
    name: "ABOUT",
    href: "#",
  },
  {
    name: "PRICING",
    href: "#",
  },
  {
    name: "CONTACT",
    href: "#",
  },
  {
    name: "BLOG",
    href: "#",
  },
];

const legalLinks: Link[] = [
  {
    name: "PRIVACY POLICY",
    href: "#",
  },
  {
    name: "TERMS & CONDITIONS",
    href: "#",
  },
  {
    name: "COOKIE POLICY",
    href: "#",
  },
];

const Footer = () => {
  return (
    <Container className="min-h-125 flex flex-col border-x border-dashed border-neutral-500/40 divide-y divide-dashed divide-neutral-500/40">
      <div className="h-full flex justify-center items-center divide-x divide-dashed divide-neutral-500/40 w-full">
        {/* Left side */}
        <div className="h-full w-1/2 flex flex-col justify-center items-start p-12 space-y-8">
          <h1 className="text-white text-2xl font-semibold">CheckMate</h1>
          <p className="text-neutral-500 text-md">
            Checkmate is a real-time chess platform built for fast games, fair
            play, and meaningful improvement. Play live, challenge friends, and
            analyze every move.
          </p>
          <div className="flex gap-4 pt-20">
            <div className="border border-dashed border-neutral-500/40 p-2 rounded-sm">
              <Github className="size-5 text-neutral-600" />
            </div>
            <div className="border border-dashed border-neutral-500/40 p-2 rounded-sm">
              <Twitter className="size-5 text-neutral-600" />
            </div>
            <div className="border border-dashed border-neutral-500/40 p-2 rounded-sm">
              <FaDiscord className="size-5 text-neutral-600" />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="h-full w-1/2 flex justify-between items-start text-xs p-5 gap-4">
          <div className="h-full flex flex-col gap-4 w-1/3">
            <p className="text-neutral-300 font-semibold">MAP</p>
            {Array.isArray(mapLinks) &&
              mapLinks.map((link, idx) => (
                <div className="flex justify-between group">
                  <Link href={link.href} key={idx} className="text-neutral-500 group-hover:text-neutral-400 duration-500 ease-in-out">
                    {link.name}
                  </Link>
                  <ChevronRight size={20} className="size-4 text-red-600/50 group-hover:text-red-500 duration-500 ease-in-out" />
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            <p className="text-neutral-300 font-semibold">COMPANY</p>
            {Array.isArray(companyLinks) &&
              companyLinks.map((link, idx) => (
                <div className="flex justify-between group">
                  <Link href={link.href} key={idx} className="text-neutral-500 group-hover:text-neutral-400 duration-500 ease-in-out">
                    {link.name}
                  </Link>
                  <ChevronRight size={20} className="size-4 text-red-500/50 group-hover:text-red-500" />
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            <p className="text-neutral-300 font-semibold">LEGAL</p>
            {Array.isArray(legalLinks) &&
              legalLinks.map((link, idx) => (
                <div className="flex justify-between group">
                  <Link href={link.href} key={idx} className="text-neutral-500 group-hover:text-neutral-400 duration-500 ease-in-out">
                    {link.name}
                  </Link>
                  <ChevronRight size={20} className="size-4 text-red-500/50 group-hover:text-red-500" />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center py-10">
        <p className="select-none text-[130px] font-extrabold text-transparent  bg-clip-text bg-linear-to-b from-neutral-700 to-transparent">
          PLAY. THINK. WIN.
        </p>
      </div>
    </Container>
  );
};

export default Footer;
