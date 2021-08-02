import { useCallback, useEffect, useState } from "react";

interface UnControl {
  interval: number;
}

type HandleScroll = (id: number) => any;

function useCarouselUncontrolled(
  count: number,
  handleScroll: HandleScroll,
  uncontrol?: UnControl
) {
  const [state, setState] = useState({ idx: -1 });

  console.log(state);

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

  useEffect(() => {
    if (!uncontrol) return;
    if (state.idx >= 0) handleScroll(state.idx);
  }, [state.idx, handleScroll, uncontrol]);

  const setUncontrol = useCallback(
    (idx: number) => {
      setState((o) => (o.idx === idx ? o : { idx }));
    },
    [setState]
  );

  return { ...state, setUncontrol };
}

export default useCarouselUncontrolled;
