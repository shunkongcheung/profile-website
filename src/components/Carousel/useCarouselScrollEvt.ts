import { ChangeEvent, useCallback, useRef, useState } from "react";

type HandleScroll = (id: number) => any;

function useCarouselScrollEvt(
  count: number,
  isVertical: boolean,
  handleScroll: HandleScroll
) {
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

      handleScroll(nextIdx);
    },
    [count, handleScroll, isVertical]
  );

  return { handleScrollEvt };
}

export default useCarouselScrollEvt;
