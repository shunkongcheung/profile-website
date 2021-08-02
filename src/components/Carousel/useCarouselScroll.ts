import { useEffect, useRef } from "react";
import { useWindowSize } from "../../hooks";

function useCarouselScroll(currIdx: number, refs: Array<HTMLElement>) {
  const windowSize = useWindowSize();
  const currIdxRef = useRef(currIdx);

  useEffect(() => {
    // on currIdx change, scroll into reference
    const ref = refs[currIdx] as HTMLElement;
    if (!ref) return;

    ref.scrollIntoView({ behavior: "smooth" });
  }, [refs, currIdx]);

  useEffect(() => {
    // on resize, refocus to current item
    const ref = refs[currIdxRef.current] as HTMLElement;
    if (!!ref) ref.scrollIntoView();
  }, [refs, windowSize]);

  useEffect(() => {
    // update reference
    currIdxRef.current = currIdx;
  }, [currIdx]);
}

export default useCarouselScroll;
