"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type OdometerDirection = "up" | "down";

export interface OdometerCountProps {
  value: number;
  minDigits?: number;
  className?: string;
}

const DEFAULT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function formatCount(value: number, minDigits: number): string {
  const safe = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  const digits = Math.max(0, Math.floor(minDigits));
  return String(safe).padStart(digits, "0");
}

function inferDirection(current: number, previous: number): OdometerDirection {
  return current >= previous ? "up" : "down";
}

function OdometerDigit({
  digit,
  direction,
  transitionDuration,
  ease,
}: {
  digit: string;
  direction: OdometerDirection;
  transitionDuration: number;
  ease: [number, number, number, number];
}) {
  const fromY = direction === "up" ? "100%" : "-100%";
  const exitY = direction === "up" ? "-100%" : "100%";

  return (
    <span
      className="relative inline-block overflow-hidden align-middle w-[1ch] h-[1em] leading-none"
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-hidden="true"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={digit}
          className="absolute inset-0 text-center"
          initial={{ y: fromY }}
          animate={{ y: 0 }}
          exit={{ y: exitY }}
          transition={{ duration: transitionDuration, ease }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function OdometerCount({
  value,
  minDigits = 3,
  className,
}: OdometerCountProps) {
  const prevValueRef = useRef<number>(value);
  const direction = inferDirection(value, prevValueRef.current);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const text = useMemo(() => formatCount(value, minDigits), [value, minDigits]);

  return (
    <span className={className ?? "inline-flex"} aria-label={text}>
      {text.split("").map((digit, idx) => (
        <OdometerDigit
          key={idx}
          digit={digit}
          direction={direction}
          transitionDuration={0.45}
          ease={DEFAULT_EASE}
        />
      ))}
    </span>
  );
}

