"use client";
import React, { useMemo, useRef, useCallback, useState } from "react";

export type LogoItem =
  | {
    node: React.ReactNode;
    href?: string;
    title?: string;
    ariaLabel?: string;
  }
  | {
    src: string;
    alt?: string;
    href?: string;
    title?: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
  };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export const LogoLoop = React.memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = "Partner logos",
    className,
    style,
  }) => {
    // Calculate duration based on speed (nominal).
    // Avoid re-calculating on every render if possible, but useMemo is fine here.
    const duration = Math.max(1000 / Math.max(speed, 1) * 20, 5);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        const isNodeItem = "node" in item;
        // If node is provided, use it. Otherwise use img.
        const content = isNodeItem ? (
          (item as any).node
        ) : (
          <img
            className="h-[var(--logoloop-logoHeight)] w-auto block object-contain pointer-events-none"
            src={(item as any).src}
            alt={(item as any).alt ?? ""}
            width={(item as any).width}
            height={(item as any).height}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        // Wrap in link if needed
        const inner = (item as any).href ? (
          <a href={(item as any).href} target="_blank" rel="noreferrer noopener" className="block hover:opacity-80 transition-opacity">
            {content}
          </a>
        ) : content;

        return (
          <li
            className={cx(
              "flex-none mr-[var(--logoloop-gap)] h-[var(--logoloop-logoHeight)] flex items-center",
              scaleOnHover && "group/item transition-transform hover:scale-110 duration-300"
            )}
            key={key}
          >
            {inner}
          </li>
        );
      },
      [scaleOnHover]
    );

    const logoList = (
      <ul className="flex items-center" role="list">
        {logos.map((item, i) => renderLogoItem(item, i))}
      </ul>
    );

    return (
      <div
        className={cx("relative overflow-hidden w-full group", className)}
        style={{
          width: toCssLength(width) ?? "100%",
          ...style,
          "--logoloop-gap": `${gap}px`,
          "--logoloop-logoHeight": `${logoHeight}px`,
          "--duration": `${duration}s`,
          "--direction": direction === "right" ? "reverse" : "normal",
        } as React.CSSProperties}
        role="region"
        aria-label={ariaLabel}
      >
        {/* Gradients */}
        {fadeOut && (
          <>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" style={{ '--tw-gradient-from': fadeOutColor } as any} />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" style={{ '--tw-gradient-from': fadeOutColor } as any} />
          </>
        )}

        {/* Marquee Track */}
        <div
          className={cx(
            "flex w-max will-change-transform",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animation: `logoloop-scroll var(--duration) linear infinite var(--direction)`,
          }}
        >
          {/* Render two copies for seamless loop */}
          {logoList}
          {logoList}
        </div>

        <style jsx>{`
          @keyframes logoloop-scroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
        `}</style>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;

// Ensure we have the styles for the marquee
// Adding will-change-transform for performance
// Adding min-height to container to prevent CLS
