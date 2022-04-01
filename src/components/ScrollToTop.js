import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.scrollTop = document.querySelector(
      "#main-content"
    ).scrollTop = 0;
    // document.querySelector("#main-content").scrollTo(0, 0);
  }, [pathname]);

  return null;
}
