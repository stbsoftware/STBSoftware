"use client";

import React, { useState, useRef, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { EquipoProfile, EquipoCard } from "./EquipoCard";

interface EquipoSliderProps {
  profiles: EquipoProfile[];
}

export const EquipoSlider: React.FC<EquipoSliderProps> = ({ profiles }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const autoplayDelay = 5000;
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const mouseOverRef = useRef(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    mode: "snap",
    renderMode: "performance",
    drag: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
      restartAutoplay();
    },
    created(slider) {
      restartAutoplay();
      // Pausar autoplay al pasar mouse
      slider.container.addEventListener("mouseover", () => {
        mouseOverRef.current = true;
        stopAutoplay();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOverRef.current = false;
        restartAutoplay();
      });
    },
    dragStarted() {
      stopAutoplay();
    },
    animationEnded() {
      restartAutoplay();
    },
    updated() {
      restartAutoplay();
    },
  });

  // Funciones de autoplay robusto
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const restartAutoplay = useCallback(() => {
    stopAutoplay();
    if (!mouseOverRef.current && instanceRef.current) {
      autoplayRef.current = setTimeout(() => {
        instanceRef.current?.next();
      }, autoplayDelay);
    }
  }, [instanceRef, stopAutoplay]);

  React.useEffect(() => {
    restartAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instanceRef, restartAutoplay]);

  // Flechas
  const handlePrev = () => {
    instanceRef.current?.prev();
    restartAutoplay();
  };
  const handleNext = () => {
    instanceRef.current?.next();
    restartAutoplay();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 relative">
      <div ref={sliderRef} className="keen-slider">
        {profiles.map((profile, idx) => (
          <div className="keen-slider__slide" key={idx}>
            <EquipoCard profile={profile} />
          </div>
        ))}
      </div>
      {/* Flechas */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full shadow p-2 z-10 hover:bg-brand-primary hover:text-white transition"
        onClick={handlePrev}
        aria-label="Anterior"
        style={{ left: -32 }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full shadow p-2 z-10 hover:bg-brand-primary hover:text-white transition"
        onClick={handleNext}
        aria-label="Siguiente"
        style={{ right: -32 }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {profiles.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${currentSlide === idx ? "bg-brand-primary" : "bg-gray-300"}`}
            onClick={() => {
              instanceRef.current?.moveToIdx(idx);
              restartAutoplay();
            }}
            aria-label={`Ir a la tarjeta ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
