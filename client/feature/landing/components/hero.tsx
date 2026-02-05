import React from "react";

import Image from "next/image";

import Container from "./Container";
import LandingChessBoard from "./landing-chessboard";

const HeroSection = () => {
  return (
    <Container className="spacy-y-10">
      {/* hero section */}
      <div className="flex w-full items-center justify-between px-2 pt-20">
        {/* left hero */}
        <div className="space-y-8">
          <div className="flex w-fit items-center gap-3 rounded-full border border-stone-400/40 px-5 py-1 font-mono text-xs text-gray-400">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
            <span>EST. 2026</span>
          </div>
          <div className="h-px w-2/3 bg-linear-to-r from-gray-300 opacity-40"></div>
          <div className="space-y-4">
            <h1 className="md-text-8xl text-7xl leading-none font-bold tracking-tight lg:text-9xl">
              <span className="flex items-baseline gap-20 text-white">
                THINK
                <Image
                  src={"/chessrepo.svg"}
                  width={200}
                  height={200}
                  alt="icon"
                />
              </span>
              <span className="bg-linear-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
                &
              </span>{" "}
              <span className="text-white">CONQUER</span>
            </h1>
          </div>
        </div>
        {/* right hero */}
        <div className="">
          <div className="rounded-xl border border-neutral-500 bg-gray-400/30 p-5">
            <div className="flex size-100">
              <LandingChessBoard />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex w-full items-center justify-center gap-18">
        <button className="relative z-20 mr-5 ml-5 inline-block border-2 border-[#fefefe] bg-[#212121] pt-4 pr-8 pb-4 pl-8 text-base font-medium whitespace-nowrap text-[#fefefe] uppercase no-underline before:absolute before:top-1.5 before:-left-0.5 before:h-[calc(100%-12px)] before:w-[calc(100%+4px)] before:scale-y-100 before:bg-[#212121] before:transition-transform before:duration-300 before:ease-in-out before:content-[''] after:absolute after:-top-0.5 after:left-1.5 after:h-[calc(100%+4px)] after:w-[calc(100%-12px)] after:scale-x-100 after:bg-[#212121] after:transition-transform after:delay-500 after:duration-300 after:ease-in-out after:content-[''] hover:before:scale-y-0 hover:after:scale-x-0">
          <span className="relative z-10">Play Chess Now</span>
        </button>

        <a
          href="#"
          className="btn-wrapper group relative inline-flex w-full items-center justify-center border border-neutral-800 pt-4 pr-4 pb-4 pl-4 transition-colors duration-300 hover:border-[#F97316] sm:w-auto"
        >
          <div className="absolute top-0 left-0 h-2 w-2 -translate-x-1 -translate-y-1 border-t border-l border-[#F97316] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></div>
          <div className="absolute right-0 bottom-0 h-2 w-2 translate-x-1 translate-y-1 border-r border-b border-[#F97316] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"></div>

          <button className="btn relative z-10 flex w-full items-center justify-center gap-3 gap-x-3 gap-y-3 bg-transparent text-sm font-medium tracking-wider text-white uppercase sm:justify-start">
            Watch Match Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              data-lucide="arrow-up-right"
              className="lucide lucide-arrow-up-right h-4 w-4"
            >
              <path d="M7 7h10v10" className=""></path>
              <path d="M7 17 17 7" className=""></path>
            </svg>
          </button>
        </a>
      </div>
    </Container>
  );
};

export default HeroSection;
