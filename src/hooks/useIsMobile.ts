import { useEffect, useState } from "react";
import { debounce } from "../utils/commonFunctions";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value.
    updateSize();

    const debouncedResize = debounce(updateSize, 250);

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
