import React from "react";
import { FaDiscord } from "react-icons/fa";

import Link from "next/link";

import { ChevronRight, Github, Twitter } from "lucide-react";

import Container from "./Container";

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
    <Container className="flex min-h-125 flex-col divide-y divide-dashed divide-neutral-500/40 border-x border-dashed border-neutral-500/40">
      <div className="flex h-full w-full items-center justify-center divide-x divide-dashed divide-neutral-500/40">
        {/* Left side */}
        <div className="flex h-full w-1/2 flex-col items-start justify-center space-y-8 p-12">
          <h1 className="text-2xl font-semibold text-white">CheckMate</h1>
          <p className="text-md text-neutral-500">
            Checkmate is a real-time chess platform built for fast games, fair
            play, and meaningful improvement. Play live, challenge friends, and
            analyze every move.
          </p>
          <div className="flex gap-4 pt-20">
            <div className="rounded-sm border border-dashed border-neutral-500/40 p-2">
              <Github className="size-5 text-neutral-600" />
            </div>
            <div className="rounded-sm border border-dashed border-neutral-500/40 p-2">
              <Twitter className="size-5 text-neutral-600" />
            </div>
            <div className="rounded-sm border border-dashed border-neutral-500/40 p-2">
              <FaDiscord className="size-5 text-neutral-600" />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex h-full w-1/2 items-start justify-between gap-4 p-5 text-xs">
          <div className="flex h-full w-1/3 flex-col gap-4">
            <p className="font-semibold text-neutral-300">MAP</p>
            {Array.isArray(mapLinks) &&
              mapLinks.map((link, idx) => (
                <div className="group flex justify-between">
                  <Link
                    href={link.href}
                    key={idx}
                    className="text-neutral-500 duration-500 ease-in-out group-hover:text-neutral-400"
                  >
                    {link.name}
                  </Link>
                  <ChevronRight
                    size={20}
                    className="size-4 text-red-600/50 duration-500 ease-in-out group-hover:text-red-500"
                  />
                </div>
              ))}
          </div>
          <div className="flex w-1/3 flex-col gap-4">
            <p className="font-semibold text-neutral-300">COMPANY</p>
            {Array.isArray(companyLinks) &&
              companyLinks.map((link, idx) => (
                <div className="group flex justify-between">
                  <Link
                    href={link.href}
                    key={idx}
                    className="text-neutral-500 duration-500 ease-in-out group-hover:text-neutral-400"
                  >
                    {link.name}
                  </Link>
                  <ChevronRight
                    size={20}
                    className="size-4 text-red-500/50 group-hover:text-red-500"
                  />
                </div>
              ))}
          </div>
          <div className="flex w-1/3 flex-col gap-4">
            <p className="font-semibold text-neutral-300">LEGAL</p>
            {Array.isArray(legalLinks) &&
              legalLinks.map((link, idx) => (
                <div className="group flex justify-between">
                  <Link
                    href={link.href}
                    key={idx}
                    className="text-neutral-500 duration-500 ease-in-out group-hover:text-neutral-400"
                  >
                    {link.name}
                  </Link>
                  <ChevronRight
                    size={20}
                    className="size-4 text-red-500/50 group-hover:text-red-500"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center py-10">
        <p className="bg-linear-to-b from-neutral-700 to-transparent bg-clip-text text-[130px] font-extrabold text-transparent select-none">
          PLAY. THINK. WIN.
        </p>
      </div>
    </Container>
  );
};

export default Footer;
