import { ChangeEvent, useCallback, useEffect, useRef } from "react";

type HandleScroll = (id: number) => any;

function useCarouselScrollEvt(
  currIdx: number,
  count: number,
  isVertical: boolean,
  handleScroll: HandleScroll,
  sliderRef?: HTMLElement
) {
  const currIdxRef = useRef(currIdx);

  const handleScrollEvt = useCallback(
    ({ target }: ChangeEvent<HTMLElement>) => {
      const { scrollHeight, scrollWidth, scrollTop, scrollLeft } = target;

      const totalDistance = isVertical ? scrollHeight : scrollWidth;
      const itemDistance = totalDistance / count;

      const currDistance = isVertical ? scrollTop : scrollLeft;

      const pastCount = currDistance / itemDistance;
      const pastInt = Math.floor(pastCount);
      const pastResidual = pastCount - pastInt;

      const nextIdx = pastResidual > 0.5 ? pastInt + 1 : pastInt;

      const isUpdated = currIdxRef.current !== nextIdx;
      if (isUpdated && sliderRef)
        sliderRef.scrollIntoView({ behavior: "smooth" });

      handleScroll(nextIdx);
    },
    [count, handleScroll, isVertical, sliderRef]
  );

  useEffect(() => {
    // update reference
    currIdxRef.current = currIdx;
  }, [currIdx]);

  return { handleScrollEvt };
}

export default useCarouselScrollEvt;
