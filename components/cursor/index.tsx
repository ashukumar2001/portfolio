"use client";
import React, { useContext, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./style.module.scss";
import { cursorContext } from "./cursorContext";
import { DEFAULT_CURSOR_SCALE_VALUE } from "@/constants";
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
    let scaleXTo = gsap.quickTo(cursorRef.current, "scaleX", {
      duration: 0.4,
      ease: "power3",
    });
    let scaleYTo = gsap.quickTo(cursorRef.current, "scaleY", {
      duration: 0.4,
      ease: "power3",
    });
    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const scaleTo = (v: number) => {
      scaleXTo(v);
      scaleYTo(v);
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
      <div className={styles.cursorBall}></div>
    </div>
  );
};

export default Cursor;
