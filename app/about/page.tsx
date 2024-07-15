"use client";
import React, { useRef } from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SKILLS_BASE_PATH } from "@/constants";
import { experience, skills, social_links } from "@/data";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 500);
      });
      gsap.ticker.lagSmoothing(0);
      const elements: HTMLElement[] = gsap.utils.toArray(
        aboutRef.current?.children!
      );
      elements.map((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
            },
          }
        );
      });
    },
    { scope: aboutRef }
  );
  return (
    <main className="min-h-screen grid place-items-center pb-32">
      <div
        ref={aboutRef}
        className="max-w-xl mx-auto antialiased pt-[42vh] relative h-full space-y-16"
      >
        <div className="space-y-3 about__section">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            👋&nbsp;&nbsp;Introduction
          </h2>
          <p className="text-xl mb-4">Hi, I&apos;m Ashu.</p>
          <p className="text-md mb-4">
            A pixel-perfectionist by day and a UI artist by night, I infuse
            aesthetics into functionality. My designs are not just visually
            appealing; they are a testament to the marriage of form and
            function. A seamless fusion of beauty and usability, leaving an
            indelible mark on the minds of users.
          </p>
          <Button size="sm" variant="outline" asChild>
            <Link href="/Ashu_Resume.pdf" target="_blank">
              See Resume&nbsp;
              <MoveRight />
            </Link>
          </Button>
        </div>
        <div className="space-y-6 about__section">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            🌐&nbsp;&nbsp;Social&nbsp;&nbsp;Links
          </h2>
          <div className="flex flex-row items-center justify-start w-full gap-8">
            <AnimatedTooltip
              items={social_links}
              baseImagePath={SKILLS_BASE_PATH}
              asIcon
              asLink
            />
          </div>
        </div>
        <div className="space-y-6 about__section">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            🧑‍💻&nbsp;&nbsp;Skills
          </h2>
          <div className="flex flex-row items-center justify-start mb-10 w-full gap-8">
            <AnimatedTooltip
              items={skills}
              baseImagePath={SKILLS_BASE_PATH}
              asIcon
            />
          </div>
        </div>
        <section className="w-full about__section">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                💼&nbsp;&nbsp;Work&nbsp;&nbsp;Experience
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                A timeline of my professional journey as a developer.
              </p>
            </div>
            <div className="relative grid gap-8 pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
              {experience.map((data, idx) => {
                const { designation, companyName, from, to, description } =
                  data;
                return (
                  <div
                    className="grid gap-2 text-sm relative"
                    key={`work-experience-${idx}`}
                  >
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                    <div className="font-medium">
                      <span className="font-semibold">{designation}</span>&nbsp;
                      <span className="font-normal text-gray-500 dark:text-gray-400">
                        -&nbsp;{companyName}
                      </span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {from}&nbsp;-&nbsp;{to}
                    </div>
                    <div className="text-sm/relaxed">{description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
