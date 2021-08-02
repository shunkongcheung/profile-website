import { useEffect, useState } from "react";

function useImageCarousel(count: number, isStart: boolean) {
  const [state, setState] = useState({ idx: -1 });

  useEffect(() => {
    setState({ idx: isStart ? 0 : 1 });
    if (!isStart) return;

    const INTERVAL = 4000;
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
    }, INTERVAL);

    return () => clearInterval(clear);
  }, [setState, count, isStart]);

  return state;
}

export default useImageCarousel;
