import { useState, useEffect } from "react";

export const getWindowSize = () => {
  const isWindow = typeof window === "object";

  const [windowSize, setWindowSize] = useState(
    isWindow ? window.innerWidth : undefined
  );

  useEffect(() => {
    const setSize = () => setWindowSize(window.innerWidth);

    if (isWindow) {
      window.addEventListener("resize", setSize);
      return () => window.removeEventListener("resize", setSize);
    }
  }, [isWindow, setWindowSize]);

  return windowSize;
};
