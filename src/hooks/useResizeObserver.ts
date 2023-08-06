import { RefObject, useEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

const useResizeObserver = (ref: RefObject<HTMLDivElement>): Dimensions => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  useEffect(() => {
    const observeTarget = ref.current;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
        });
      });
    });
    resizeObserver.observe(observeTarget as Element);
    return () => {
      resizeObserver.unobserve(observeTarget as Element);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
