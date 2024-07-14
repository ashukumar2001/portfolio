"use client";
import React, { useContext, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cursorContext } from "./cursorContext";
gsap.registerPlugin(useGSAP);
const CursorFollower = ({
  children,
  scaleToValue = 3,
}: {
  children: React.ReactNode;
  scaleToValue?: number;
}) => {
  const { cursorUtils, cursorRef } = useContext(cursorContext);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const xTo = gsap.quickTo(cursorFollowerRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorFollowerRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });
    const handleMouseEnter = () => {
      // // set mix-blend mode to exclusion
      // if (cursorRef?.current)
      // cursorRef.current.style.mixBlendMode = "exclusion";
      // // scale the cursor
      cursorUtils.current?.scaleTo(scaleToValue);
      // unfollow the pointer on window
      cursorUtils.current?.unfollowCursor();
    };
    const handleMouseLeave = () => {
      // move cursor back to default config
      cursorUtils.current?.scaleTo(0);
      cursorUtils.current?.followCursor();
      //   set mix-blend-mode back to normal
      if (cursorRef?.current) cursorRef.current.style.mixBlendMode = "normal";
      //   set the cursor follower element back to its position
      xTo(0);
      yTo(0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // follow the pointer on cursor follower element
      const { top, left, height, width } =
        cursorFollowerRef.current?.getBoundingClientRect()!;
      cursorUtils.current?.xTo(left + width / 2);
      cursorUtils.current?.yTo(top + height / 2);
      // follow the cursor with given speed
      const { pageX, pageY } = e;
      const followerRects = cursorFollowerRef.current?.getBoundingClientRect()!;

      xTo(-(followerRects.left - pageX) * 0.2);
      yTo(-(followerRects.top - pageY + window.scrollY) * 0.2);
    };

    // Add event handlers for the cursor moving on the element
    cursorFollowerRef.current?.addEventListener("mouseenter", handleMouseEnter);
    cursorFollowerRef.current?.addEventListener("mouseleave", handleMouseLeave);
    cursorFollowerRef.current?.addEventListener("mousemove", handleMouseMove);

    return () => {
      // Remove all event listners for cleanup
      cursorFollowerRef.current?.removeEventListener(
        "mousemove",
        handleMouseMove
      );
      cursorFollowerRef.current?.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
      cursorFollowerRef.current?.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  });
  return (
    <div
      ref={cursorFollowerRef}
      className="relative before:absolute before:content-[''] before:-inset-[20px] bg-transparent"
    >
      {children}
    </div>
  );
};

export default CursorFollower;
