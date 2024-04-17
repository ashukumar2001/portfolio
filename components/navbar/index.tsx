"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ModeToggle } from "../theme/mode-toggle";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);
const links = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Projects",
    url: "/projects",
  },
];

const getElementRects = (element: HTMLElement) => {
  const elementContainerRects = element.parentElement?.getBoundingClientRect();
  const elementRects = element.getBoundingClientRect();
  return {
    left: elementRects.left - elementContainerRects!.left || 0 - 2,
    height: elementRects.height,
    width: elementRects.width,
  };
};
const Navbar = () => {
  const navLinksRef = useRef<HTMLUListElement>(null);
  const activeLinkIndicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<{
    title: string;
    url: string;
    rects: { left: number; height: number; width: number };
  } | null>(null);
  useEffect(() => {
    if (navLinksRef.current) {
      const activeLinkIndex = links.findIndex((l) => l.url === pathname);
      if (activeLinkIndex !== -1) {
        const linkElement = navLinksRef.current?.children?.item(
          activeLinkIndex
        ) as HTMLElement;
        if (linkElement)
          setActiveLink({
            ...links[activeLinkIndex],
            rects: getElementRects(linkElement),
          });
      }
    }
  }, [pathname]);

  useGSAP(() => {
    if (activeLink?.rects && activeLinkIndicatorRef.current) {
      gsap.to(activeLinkIndicatorRef.current, {
        left: activeLink.rects.left,
        height: activeLink.rects.height,
        width: activeLink.rects.width,
        opacity: 1,
        ease: "power3.out",
      });
    }
  }, [activeLink]);

  useGSAP(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        top: 0,
        delay: 0.25,
        ease: "power1.out",
        duration: 0.8,
      });
    }
  });

  return (
    <nav
      ref={navRef}
      className="w-full absolute flex justify-center py-3 -top-full left-0 z-[998] gap-3 h-20"
    >
      <ul
        ref={navLinksRef}
        className="relative flex flex-row justify-center items-center border w-fit gap-3 p-3 rounded-full dark:bg-gray-950/10 bg-white/5 border-neutral-700 backdrop-blur-[2px]"
      >
        {links.map((link) => (
          <li
            className="px-3 py-1 rounded-full cursor-pointer text-sm"
            key={link.title}
          >
            <Link href={link.url}>{link.title}</Link>
          </li>
        ))}

        <div
          ref={activeLinkIndicatorRef}
          className="dark:bg-white/10 bg-gray-100 rounded-full absolute -z-[1] opacity-0"
        ></div>
      </ul>
      <div className="relative flex flex-row justify-center items-center border w-14 h-full gap-3  rounded-full dark:bg-gray-950/10 bg-white/5 border-neutral-700 backdrop-blur-[2px]">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
