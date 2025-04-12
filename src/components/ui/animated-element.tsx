"use client";

import type React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?:
    | "fade"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "scale"
    | "bounce";
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

export function AnimatedElement({
  children,
  animation = "fade",
  delay = 0,
  duration = 0.5,
  className,
  id,
}: AnimatedElementProps) {
  // Define animation variants
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-down": {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    bounce: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      },
    },
  };

  const selectedVariant = variants[animation];

  const transition =
    animation === "bounce"
      ? {} // Transition is included in the variant for bounce
      : { duration, delay };

  return (
    <motion.div
      id={id}
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={selectedVariant}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
