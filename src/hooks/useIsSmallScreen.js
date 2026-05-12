import { useState, useEffect } from "react";

export function useIsSmallScreen(breakpoint = 768) {
  const getInitial = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  };

  const [isSmallScreen, setIsSmallScreen] = useState(getInitial);

  useEffect(() => {
    const checkSize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };

    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [breakpoint]);

  return isSmallScreen;
}

export function getAnimationProps(isSmallScreen, animationProps) {
  if (isSmallScreen) {
    return {};
  }
  return animationProps;
}
