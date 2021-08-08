import { useCallback, useEffect, useState } from "react";

const useInViewport = (rootMargin: string, isOnce = true) => {
  const [element, setElement] = useState<HTMLElement>();
  const [isVisible, setState] = useState(false);

  const handleRef = useCallback(
    (ref?: HTMLElement) => {
      if (ref) setElement(ref);
    },
    [setElement]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState((o) => {
          if (!!o && isOnce) return true;
          return entry.isIntersecting;
        });
      },
      { rootMargin }
    );

    if (!!element) observer.observe(element);

    return () => {
      if (!!element) observer.unobserve(element);
    };
  }, [element, rootMargin]);

  return { isVisible, handleRef };
};

export default useInViewport;
