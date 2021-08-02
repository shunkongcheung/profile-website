import { useCallback, useEffect, useState } from "react";

interface UnControl {
  interval: number;
}

function useCarouselUncontrolled(count: number, uncontrol?: UnControl) {
  const [state, setState] = useState({ idx: -1 });

  useEffect(() => {
    // update controlled index in internal
    if (!uncontrol) return;
    const { interval } = uncontrol;

    const clear = setInterval(() => {
      setState((state) => {
        const oIdx = state.idx;
        const nIdx = oIdx + 1;

        const isOver = nIdx >= count;

        if (isOver) {
          clearInterval(clear);
          return { idx: oIdx };
        } else {
          return { idx: nIdx % count };
        }
      });
    }, interval);

    return () => clearInterval(clear);
  }, [setState, count, uncontrol]);

  const initUncontrolled = useCallback(() => {
    setState((o) => (o.idx !== -1 ? o : { idx: 0 }));
  }, [setState]);

  return { ...state, initUncontrolled };
}

export default useCarouselUncontrolled;
