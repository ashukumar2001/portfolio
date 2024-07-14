"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import { details } from "@/data";
export default function Home() {
  const introParaRef = useRef(null);

  useGSAP(() => {
    if (introParaRef.current) {
      const introLines = SplitType.create(introParaRef.current).lines || [];
      introLines.forEach((line, i) => {
        gsap.set(line, { overflow: "hidden" });
        const lineChars = SplitType.create(line).chars;
        gsap.from(lineChars, {
          yPercent: 100,
          stagger: 0.03,
          duration: 2,
          ease: "elastic.out(.7, 0.3)",
          delay: i * 0.5,
        });
      });
    }
  });
  return (
    <main className="h-screen grid place-items-center">
      <section className="w-fit relative before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] after:top-0  before:left-1/2 before:top-0">
        <h1
          className="text-3xl text-center sm:text-4xl md:text-6xl font-semibold leading-normal md:leading-normal sm:leading-normal overflow-hidden"
          ref={introParaRef}
        >
          👋&nbsp;‍Hi, I&apos;m&nbsp;
          <span className="text-orange-400">{details.fullName}</span>
          <br />
          A&nbsp;<span className="text-green-300">{details.profile}</span>
          &nbsp;🧑‍💻
          <br />
        </h1>
      </section>
    </main>
  );
}
