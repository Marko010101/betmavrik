import { useEffect, useState } from "react";

const useBreakpoint = () => {
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleResize = () => setIsSmOrLarger(mediaQuery.matches);
    handleResize();

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return { isSmOrLarger };
};

export default useBreakpoint;
