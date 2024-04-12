"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, MoveUpRight } from "lucide-react";
import { projects } from "@/data";
import Link from "next/link";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const colors = ["bg-red-400", "bg-green-400", "bg-blue-400", "bg-violet-400"];
const Projects = () => {
  const projectsContainerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 500);
      });
      gsap.ticker.lagSmoothing(0);

      let tabs: HTMLElement[] = gsap.utils.toArray(".tab");
      tabs.forEach((tab, i) => {
        gsap.set(tab, {
          y: 0,
        });
        ScrollTrigger.create({
          trigger: tab,
          start: "top top",
          pin: i !== tabs.length - 1,
          pinSpacing: false,
          scrub: true,
          onUpdate: (data) => {
            if (i !== tabs.length - 1) {
              const { progress } = data;

              gsap.set(tab, {
                scale: 1 - progress * 0.5,
                y: 0,
                filter: `blur(${progress * 10}px)`,
              });
            }
          },
        });
      });
    },
    { scope: projectsContainerRef }
  );
  return (
    <main className="min-h-screen grid place-items-center py-32">
      <section ref={projectsContainerRef} className="space-y-3 md:w-3/4">
        {projects.map(
          (
            { name, images, imageDir, description, liveURL, sourceCodeURL },
            i
          ) => {
            return (
              <div
                key={`project-${i}`}
                className={cn("tab w-full h-screen grid place-items-center")}
              >
                <div className="p-4 space-y-6 bg-neutral-900 border rounded-xl shadow-2xl shadow-white/5">
                  <div className="w-full rounded-xl overflow-hidden relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-24 after:w-full after:z-10  after:bg-gradient-to-b after:from-transparent after:to-neutral-900/25">
                    <Image
                      src={imageDir + images[0]}
                      layout="responsive"
                      width={16}
                      height={9}
                      alt="project-screenshot"
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between">
                      <h1 className="text-2xl">{name}</h1>
                      <div className="space-x-3">
                        {liveURL && (
                          <Link href={liveURL} target="_blank">
                            <Button variant="outline" size="sm" title="Visit">
                              <MoveUpRight size={16} className="mr-2" /> Visit
                            </Button>
                          </Link>
                        )}
                        {sourceCodeURL && (
                          <Link href={sourceCodeURL} target="_blank">
                            <Button variant="outline" size="sm" title="Visit">
                              <Github size={16} className="mr-2" />
                              Source Code
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-foreground text-neutral-300">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </section>
    </main>
  );
};

export default Projects;
