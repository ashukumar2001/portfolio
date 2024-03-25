"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import CursorFollower from "../cursor/CursorFollower";
import Link from "next/link";

export const AnimatedTooltip = ({
  items,
  baseImagePath = "",
  asIcon = false,
  asLink = false,
}: {
  items: {
    id: number;
    name: string;
    description?: string;
    image?: string;
    icon?: any;
    url?: string;
  }[];
  baseImagePath?: string;
  asIcon?: boolean;
  asLink?: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              key={`tooptip-${idx}`}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute left-1/2 -translate-x-1/2 z-30 w-[40%] -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
              <div className="font-bold text-white relative z-30 text-base">
                {item.name}
              </div>
              {item?.description && (
                <div className="text-white text-xs">{item.description}</div>
              )}
            </motion.div>
          )}
          <IconWrapper asLink={asLink} url={item.url}>
            {asIcon ? (
              <div onMouseMove={handleMouseMove}>
                <CursorFollower>
                  {item.image ? (
                    <Image
                      alt={item.name}
                      src={baseImagePath + item.image}
                      height={28}
                      width={28}
                    />
                  ) : item.icon ? (
                    <item.icon className="text-3xl" />
                  ) : null}
                </CursorFollower>
              </div>
            ) : (
              <Image
                onMouseMove={handleMouseMove}
                height={100}
                width={100}
                src={baseImagePath + item.image}
                alt={item.name}
                className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500 aspect-square"
              />
            )}
          </IconWrapper>
        </div>
      ))}
    </>
  );
};
const IconWrapper = ({
  children,
  asLink,
  url,
}: {
  children: React.ReactNode;
  asLink?: boolean;
  url?: string;
}) => {
  return asLink && url ? (
    <Link target="_blank" href={url}>
      {children}
    </Link>
  ) : (
    children
  );
};
