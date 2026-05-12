import { useState, useEffect } from "react";

export function useIsSmallScreen(breakpoint = 768) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
