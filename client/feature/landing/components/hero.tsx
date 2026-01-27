import Image from 'next/image'
import React from 'react'
import LandingChessBoard from './landing-chessboard'
import Container from './Container'

const HeroSection = () => {
  return (
    <Container className="spacy-y-10">
        {/* hero section */}
        <div className="flex w-full justify-between items-center px-2 pt-20">
          {/* left hero */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-xs text-gray-400 font-mono border border-stone-400/40 w-fit px-5 py-1 rounded-full">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>EST. 2026</span>
            </div>
            <div className="h-px bg-linear-to-r from-gray-300 w-2/3 opacity-40"></div>
            <div className="space-y-4">
              <h1 className="text-7xl md-text-8xl lg:text-9xl font-bold leading-none tracking-tight">
                <span className="text-white flex gap-20 items-baseline">
                  THINK
                  <Image
                    src={"/chessrepo.svg"}
                    width={200}
                    height={200}
                    alt="icon"
                  />
                </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-400 to-gray-600">
                  &
                </span>{" "}
                <span className="text-white">CONQUER</span>
              </h1>
            </div>
          </div>
          {/* right hero */}
          <div className="">
            <div className="p-5 rounded-xl border border-neutral-500 bg-gray-400/30">
              <div className="size-100 flex">
                <LandingChessBoard />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full justify-center gap-18 mt-20">
          <button className="z-20 inline-block whitespace-nowrap uppercase no-underline before:absolute before:-left-0.5 before:top-1.5 before:h-[calc(100%-12px)] before:w-[calc(100%+4px)] before:bg-[#212121] before:content-[''] before:transition-transform before:duration-300 before:ease-in-out before:scale-y-100 hover:before:scale-y-0 after:absolute after:-top-0.5 after:left-1.5 after:h-[calc(100%+4px)] after:w-[calc(100%-12px)] after:bg-[#212121] after:content-[''] after:transition-transform after:duration-300 after:delay-500 after:ease-in-out after:scale-x-100 hover:after:scale-x-0 text-base font-medium text-[#fefefe] bg-[#212121] border-[#fefefe] border-2 mr-5 ml-5 pt-4 pr-8 pb-4 pl-8 relative">
            <span className="relative z-10">Play Chess Now</span>
          </button>

          <a href="#" className="btn-wrapper group inline-flex justify-center items-center hover:border-[#F97316] transition-colors duration-300 sm:w-auto w-full border-neutral-800 border pt-4 pr-4 pb-4 pl-4 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#F97316] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                    <div className="group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 opacity-0 w-2 h-2 border-[#F97316] border-r border-b absolute right-0 bottom-0 translate-x-1 translate-y-1"></div>
                    
                    <button className="btn flex gap-3 uppercase z-10 sm:justify-start text-sm font-medium text-white tracking-wider bg-transparent w-full relative gap-x-3 gap-y-3 items-center justify-center">
                        Watch Match Now
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="arrow-up-right" className="lucide lucide-arrow-up-right w-4 h-4"><path d="M7 7h10v10" className=""></path><path d="M7 17 17 7" className=""></path></svg>
                    </button>
                </a>
        </div>


      </Container>
  )
}

export default HeroSection