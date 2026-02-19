// useInfiniteCarousel.ts (Create this file)

import React, { useState, useEffect, useRef } from "react";

// Hook to handle the infinite auto-playing carousel logic
// Hook to handle the infinite auto-playing carousel logic
export const useInfiniteCarousel = (
  itemCount: number,
  itemsPerSlide: number = 3
) => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start at index 1 (first real slide)
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalRealSlides = Math.ceil(itemCount / itemsPerSlide);
  const totalCarouselSlides = totalRealSlides + 2; // Includes one duplicate at start and end

  // --- Auto-play Logic ---
  useEffect(() => {
    // Optimization: If no slides, do nothing
    if (totalRealSlides <= 0) return;

    const startAutoPlay = () => {
      // Clear any existing interval to prevent duplicates
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);

      autoPlayRef.current = setInterval(() => {
        // Use functional state update to always get fresh state
        setCurrentSlide((prev) => {
          const nextSlide = prev + 1;

          if (nextSlide >= totalCarouselSlides) {
            // 1. We schedule the jump-back reset
            requestAnimationFrame(() => {
              setTimeout(() => {
                setIsTransitioning(false); // Enable transition
                setCurrentSlide(1); // Jump to first real slide
              }, 700); // 700ms matches CSS transition duration
            });

            setIsTransitioning(true); // Disable transition for the jump? Wait, logic inverse in render
            // Actually, based on original logic:
            // "setIsTransitioning" seems to control a class removal.
            // If standard logic is "nextSlide", we return it.
            // If wrap around, we let it go to duplicate, then reset.
            // But we must return value for state update.
            return nextSlide;
          }
          return nextSlide;
        });
      }, 4000);
    };

    if (!isHovered) {
      startAutoPlay();
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered, totalCarouselSlides, totalRealSlides]);

  // --- Navigation Logic ---
  const navigate = (direction: "next" | "prev") => {
    // Clear auto-play when navigating manually
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    setCurrentSlide((prev) => {
      const nextSlide = prev + (direction === "next" ? 1 : -1);

      if (direction === "next" && nextSlide >= totalCarouselSlides) {
        // Jump logic
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(1);
        }, 700);
        setIsTransitioning(true);
        // We allow it to render the duplicate slide first (index = totalCarouselSlides - 1 is supposedly last one?)
        // The original logic returned "totalCarouselSlides - 1" inside the if, which stops it from incrementing past it?
        // Let's keep original return logic but optimize the wrapping.
        return totalCarouselSlides - 1;
      }

      if (direction === "prev" && nextSlide <= 0) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentSlide(totalRealSlides);
        }, 700);
        setIsTransitioning(true);
        return 0; // Go to first duplicate (index 0)
      }

      return nextSlide;
    });
  };

  // Calculate the currently active real slide index (0-based) for the progress indicator
  const activeDotIndex = currentSlide > totalRealSlides ? 0 : Math.max(0, currentSlide - 1);
  const slideStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,
    willChange: "transform", // Hint for browser composition
  };
  const transitionClass = isTransitioning ? "transition-none" : "transition-transform duration-700 ease-in-out";

  return {
    navigate,
    nextSlide: () => navigate("next"),
    prevSlide: () => navigate("prev"),
    setIsHovered,
    slideStyle,
    transitionClass,
    activeDotIndex,
    totalRealSlides,
    totalCarouselSlides,
  };
};
