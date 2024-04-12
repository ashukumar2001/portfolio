"use client";
import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SKILLS_BASE_PATH } from "@/constants";
import { skills, social_links } from "@/data";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const Badge = ({ text }: { text: string }) => {
  return (
    <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
      {text}
    </h2>
  );
};
export default function About() {
  return (
    <main className="min-h-screen grid place-items-center py-32">
      <TracingBeam className="px-6">
        <div className="max-w-xl mx-auto antialiased pt-4 relative h-full space-y-10">
          <div className="">
            <Badge text="Intro" />
            <p className="text-xl mb-4">Hi, I'm Ashu.</p>
            <p className="text-md mb-4">
              A pixel-perfectionist by day and a UI artist by night, I infuse
              aesthetics into functionality. My designs are not just visually
              appealing; they are a testament to the marriage of form and
              function. A seamless fusion of beauty and usability, leaving an
              indelible mark on the minds of users.
            </p>
            <Button size="sm" variant="outline">
              See Resume&nbsp;
              <MoveRight />
            </Button>
          </div>
          <div className="space-y-3">
            <Badge text="Find me on..." />
            <div className="flex flex-row items-center justify-start w-full gap-8">
              <AnimatedTooltip
                items={social_links}
                baseImagePath={SKILLS_BASE_PATH}
                asIcon
                asLink
              />
            </div>
          </div>
          <div className="">
            <Badge text="Skills" />
            <div className="flex flex-row items-center justify-start mb-10 w-full gap-8">
              <AnimatedTooltip
                items={skills}
                baseImagePath={SKILLS_BASE_PATH}
                asIcon
              />
            </div>
          </div>
        </div>
      </TracingBeam>
    </main>
  );
}
