
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the window to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // optional smooth scroll
    });

    // Optional: also scroll any scrollable container if needed
    const scrollable = document.querySelector("div[role='main']") || document.body;
    if (scrollable) scrollable.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
