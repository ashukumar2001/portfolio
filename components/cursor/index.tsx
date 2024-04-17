"use client";
import React, { useContext, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";
import { cursorContext } from "./cursorContext";
import { DEFAULT_CURSOR_SCALE_VALUE } from "@/constants";
import { cn } from "@/lib/utils";
gsap.registerPlugin(useGSAP);

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { cursorUtils, cursorRef: cursorRefFromContext } =
    useContext(cursorContext);
  useGSAP(() => {
    let xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    let yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });
    let widthTo = gsap.quickTo(cursorRef.current, "width", {
      duration: 0.4,
      ease: "power3",
    });
    let heightTo = gsap.quickTo(cursorRef.current, "height", {
      duration: 0.4,
      ease: "power3",
    });
    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const scaleTo = (v: number) => {
      widthTo(16 * v);
      heightTo(16 * v);
    };

    const handleMouseOver = () => {
      scaleTo(DEFAULT_CURSOR_SCALE_VALUE);
    };
    const handleMouseLeave = () => {
      scaleTo(0);
    };
    const followCursor = () => {
      window.addEventListener("mousemove", handleMouseMove);
    };
    const unfollowCursor = () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
    cursorUtils.current = {
      xTo,
      yTo,
      scaleTo,
      followCursor,
      unfollowCursor,
    };
    if (cursorRefFromContext) cursorRefFromContext.current = cursorRef.current;

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseLeave);
    followCursor();
    return () => {
      unfollowCursor();
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div
        className={cn(
          styles.cursorBall,
          "before:border before:border-black before:dark:border-white"
        )}
      ></div>
    </div>
  );
};

export default Cursor;
