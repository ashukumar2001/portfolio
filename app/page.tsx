"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import CursorFollower from "@/components/cursor/CursorFollower";
export default function Home() {
  const introParaRef = useRef(null);

  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    tl.current = gsap.timeline();
    if (introParaRef.current) {
      const introLines = SplitType.create(introParaRef.current).lines || [];
      introLines.forEach((line, i) => {
        gsap.set(line, { overflow: "hidden" });
        let timeline = gsap.timeline({ delay: i });
        Array.from(line.children).forEach((word) => {
          const sign = i % 2 === 0 ? -1 : 1;
          timeline.fromTo(
            word,
            {
              y: sign * 180,
              rotate: sign * 20,
            },
            {
              y: 0,
              duration: 0.5,
              rotate: 0,
              ease: "power1.inOut",
            }
          );
        });
      });
    }
  });
  return (
    <main className="h-screen grid place-items-center">
      <section className="w-fit relative before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] after:top-0  before:left-1/2 before:top-0">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-normal md:leading-normal sm:leading-normal"
          ref={introParaRef}
        >
          👋&nbsp;‍Hi, I&apos;m&nbsp;
          <span className="text-orange-400">Ashu</span>
          <br />
          A&nbsp;<span className="text-green-300">Front-End Developer</span>
          &nbsp;🧑‍💻
          <br />
        </h1>
      </section>
    </main>
  );
}

// <div
// >
//   <Image
//     className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//     src="/next.svg"
//     alt="Next.js Logo"
//     width={180}
//     height={37}
//     priority
//   />
// </div>
