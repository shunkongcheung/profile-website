import { useEffect, useRef, useState } from "react";

function useDeferredValue(value: any, { timeoutMs }: { timeoutMs: number }) {
  const [deferredValue, setDeferredValue] = useState(value);
  const mostUpdatedValue = useRef(value);
  const pending = useRef(false);

  useEffect(() => {
    // update ref whenever value change
    mostUpdatedValue.current = value;
  }, [value]);

  useEffect(() => {
    // when value change, try to trigger a timeout
    if (pending.current) return;
    pending.current = true;

    setTimeout(() => {
      setDeferredValue(mostUpdatedValue.current);
      pending.current = false;
    }, timeoutMs);
  }, [timeoutMs, value]);

  return deferredValue;
}

export default useDeferredValue;
