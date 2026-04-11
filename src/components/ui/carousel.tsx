"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  className?: string;
}

const Slide = ({ children, index, current, handleSlideClick, className = "" }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="h-full flex-1 [perspective:1200px] [transform-style:preserve-3d] card-inner-shadow rounded-sm">
      <li
        ref={slideRef}
        className={`flex flex-1 flex-col items-center justify-center relative transition-all duration-300 ease-in-out z-10 ${className}`}
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="relative w-full h-full transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          {children}
        </div>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-full h-5 flex items-center justify-center glass-hover button-shadow rounded-sm focus:border-[--primary-blue] focus:outline-none hover:bg-[--primary-blue] hover:text-white transition-all duration-300 ${
        type === "previous" ? "" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <span className="w-3 h-3 flex font-rajdhani items-center justify-center transition-colors">
        {type === "previous" ? <ChevronLeft /> : <ChevronRight />}
      </span>
    </button>
  );
};

interface CarouselProps {
  children: ReactNode[];
  containerClassName?: string;
  slideClassName?: string;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  disableTransition?: boolean;
}

export default function Carousel({
  children,
  containerClassName = "",
  slideClassName = "",
  activeIndex,
  onActiveIndexChange,
  disableTransition = false,
}: CarouselProps) {
  const [internalCurrent, setInternalCurrent] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchEndYRef = useRef<number | null>(null);
  const current = activeIndex ?? internalCurrent;

  useEffect(() => {
    if (children.length === 0) {
      setInternalCurrent(0);
      return;
    }

    if (current > children.length - 1) {
      const nextIndex = children.length - 1;
      setInternalCurrent(nextIndex);
      onActiveIndexChange?.(nextIndex);
    }
  }, [children.length, current, onActiveIndexChange]);

  const setCurrent = (index: number) => {
    setInternalCurrent(index);
    onActiveIndexChange?.(index);
  };

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? children.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === children.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
    touchEndXRef.current = null;
    touchEndYRef.current = null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = event.touches[0]?.clientX ?? null;
    touchEndYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = () => {
    if (
      touchStartXRef.current === null ||
      touchEndXRef.current === null ||
      touchStartYRef.current === null ||
      touchEndYRef.current === null
    ) {
      touchStartXRef.current = null;
      touchEndXRef.current = null;
      touchStartYRef.current = null;
      touchEndYRef.current = null;
      return;
    }

    const swipeDistanceX = touchStartXRef.current - touchEndXRef.current;
    const swipeDistanceY = touchStartYRef.current - touchEndYRef.current;
    const swipeThreshold = 48;
    const isHorizontalSwipe =
      Math.abs(swipeDistanceX) >= swipeThreshold &&
      Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY);

    if (isHorizontalSwipe) {
      if (swipeDistanceX > 0) {
        handleNextClick();
      } else {
        handlePreviousClick();
      }
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
    touchStartYRef.current = null;
    touchEndYRef.current = null;
  };

  const id = useId();

  return (
    <div
      className={`relative mx-auto ${containerClassName}`}
      aria-labelledby={`carousel-heading-${id}`}
    >
      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideClick(index)}
            className={`h-2 w-2 button-style rounded-full transition-all duration-300 ${
              current === index ? "bg-[--primary-blue] w-4" : "hover:bg-neutral-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      {/* Slide Wrapper with overflow-hidden */}
      <div
        className="overflow-hidden w-full h-full relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ul
          className={`absolute flex ${disableTransition ? "" : "transition-transform duration-1000 ease-in-out"}`}
          style={{
            transform: `translateX(-${current * (100 / children.length)}%)`,
            width: `${children.length * 100}%`,
          }}
        >
          {children.map((child, index) => (
            <Slide
              key={index}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
              className={slideClassName}
            >
              {child}
            </Slide>
          ))}
        </ul>
      </div>

      {/* Controls - Positioned outside the Slide Wrapper */}
      <div className="absolute flex justify-center w-full bottom-0 gap-2">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}

