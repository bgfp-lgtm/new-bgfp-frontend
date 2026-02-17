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
    const [isHovered, setIsHovered] = useState(false);

    // Calculate animation duration based on a nominal sequence width
    // Lower speed value → slower animation → longer duration
    // We use a base width assumption; the CSS animation handles the actual 0% → -50%
    const animationDuration = useMemo(() => {
      const baseDuration = 1000 / Math.max(speed, 1);
      return `${Math.max(baseDuration * 20, 5)}s`;
    }, [speed]);

    const animationDirection = direction === "right" ? "reverse" : "normal";

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsHovered(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

    const renderLogoItem = useCallback(
      (item: LogoItem, key: React.Key) => {
        const isNodeItem = "node" in item;

        const content = isNodeItem ? (
          <span
            className={cx(
              "inline-flex items-center",
              scaleOnHover &&
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
            )}
            aria-hidden={!!(item as any).href && !(item as any).ariaLabel}
          >
            {(item as any).node}
          </span>
        ) : (
          <img
            className={cx(
              "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
              "[-webkit-user-drag:none] pointer-events-none",
              "[image-rendering:-webkit-optimize-contrast]",
              scaleOnHover &&
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
            )}
            src={(item as any).src}
            srcSet={(item as any).srcSet}
            sizes={(item as any).sizes}
            width={(item as any).width}
            height={(item as any).height}
            alt={(item as any).alt ?? ""}
            title={(item as any).title}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        );

        const itemAriaLabel = isNodeItem
          ? (item as any).ariaLabel ?? (item as any).title
          : (item as any).alt ?? (item as any).title;

        const inner = (item as any).href ? (
          <a
            className={cx(
              "inline-flex items-center no-underline rounded",
              "transition-opacity duration-200 ease-linear",
              "hover:opacity-80",
              "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
            )}
            href={(item as any).href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <li
            className={cx(
              "flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]",
              scaleOnHover && "overflow-visible group/item"
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [scaleOnHover]
    );

    // Render exactly 2 copies for seamless CSS marquee (0% → -50%)
    const logoLists = useMemo(
      () =>
        [0, 1].map((copyIndex) => (
          <ul
            className="flex items-center flex-shrink-0"
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
          >
            {logos.map((item, itemIndex) =>
              renderLogoItem(item, `${copyIndex}-${itemIndex}`)
            )}
          </ul>
        )),
      [logos, renderLogoItem]
    );

    const cssVariables = useMemo(
      () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      } as React.CSSProperties),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          "relative overflow-x-hidden group",
          scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
          className
        ),
      [scaleOnHover, className]
    );

    const containerStyle = useMemo(
      (): React.CSSProperties => ({
        width: toCssLength(width) ?? "100%",
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style]
    );

    return (
      <div
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-y-0 left-0 z-[1]",
                "w-[clamp(24px,8%,120px)]",
                "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,#ffffff)_0%,rgba(0,0,0,0)_100%)]",
                "dark:bg-[linear-gradient(to_right,#0b0b0b_0%,rgba(0,0,0,0)_100%)]"
              )}
            />
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-y-0 right-0 z-[1]",
                "w-[clamp(24px,8%,120px)]",
                "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,#ffffff)_0%,rgba(0,0,0,0)_100%)]",
                "dark:bg-[linear-gradient(to_left,#0b0b0b_0%,rgba(0,0,0,0)_100%)]"
              )}
            />
          </>
        )}

        {/* CSS-animated marquee track — zero JS thread cost */}
        <div
          className="flex w-max select-none"
          style={{
            animation: `logoloop-marquee ${animationDuration} linear infinite`,
            animationDirection: animationDirection,
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {logoLists}
        </div>

        <style jsx>{`
          @keyframes logoloop-marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            div {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
