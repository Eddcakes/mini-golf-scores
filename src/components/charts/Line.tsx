import { useCallback, useEffect, useRef } from "react";
import { easeLinear, line, select } from "d3";
import { IScore } from "../../models/data";
import { AnimationType, XScale, YScale } from "../../utils/charts";

interface LineProps {
  xScale: XScale;
  yScale: YScale;
  color: string;
  data: IScore[];
  animation: AnimationType;
}

export function Line({ xScale, yScale, color, data, animation }: LineProps) {
  const lineRef = useRef<SVGPathElement>(null);
  // define different types of animation we can use
  const animateLeft = useCallback(() => {
    const totalLength = lineRef.current?.getTotalLength();
    select(lineRef.current)
      .attr("opacity", 1)
      .attr("stroke-dasharray", `${totalLength},${totalLength}`)
      .attr("stroke-dashoffset", `${totalLength}`)
      .transition()
      .duration(750)
      .ease(easeLinear)
      .attr("stroke-dashoffset", 0);
  }, []);

  const animateFadeIn = useCallback(() => {
    select(lineRef.current)
      .attr("opacity", 0)
      .transition()
      .duration(750)
      .ease(easeLinear)
      .attr("opacity", 1);
  }, []);

  const noAnimation = useCallback(() => {
    select(lineRef.current).attr("opacity", 1);
  }, []);

  useEffect(() => {
    switch (animation) {
      case AnimationType.LEFT:
        animateLeft();
        break;
      case AnimationType.FADE_IN:
        animateFadeIn();
        break;
      case AnimationType.NO_ANIMATION:
        noAnimation();
        break;
      default:
        exhaustiveGuard(animation);
    }
  }, [animateLeft, animateFadeIn, noAnimation, animation]);

  useEffect(() => {
    if (animation === AnimationType.LEFT) {
      const totalLength = lineRef.current?.getTotalLength();
      select(lineRef.current).attr(
        "stroke-dasharray",
        `${totalLength},${totalLength}`
      );
    }
  }, [xScale, yScale, animation]);

  const createPath = line<IScore>()
    .x((d) => xScale(d.hole))
    .y((d) => yScale(d.score));

  return (
    <path
      ref={lineRef}
      d={createPath(data) || ""}
      stroke={color}
      strokeWidth={3}
      fill="none"
      opacity={0}
    />
  );
}

function exhaustiveGuard(_value: never): never {
  throw new Error(
    `ERROR! Reached forbidden guard function with unexpected value: ${JSON.stringify(
      _value
    )}`
  );
}
