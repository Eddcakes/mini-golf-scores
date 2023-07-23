import { useEffect, useRef } from "react";
import { axisBottom, axisLeft, easeLinear, select } from "d3";
import { XScale, YScale } from "../../utils/charts";

interface AxisProps {
  axisType: "x" | "y";
  scale: XScale | YScale;
  ticks: number;
  transform: string;
  disableAnimation: boolean;
}

export function GridLine({
  axisType,
  scale,
  ticks,
  transform,
  disableAnimation,
}: AxisProps) {
  const gRef = useRef<SVGGElement>(null);
  useEffect(() => {
    const axisGenerator = axisType === "x" ? axisBottom : axisLeft;
    const axis = axisGenerator(scale).ticks(ticks);

    const gridGroup = select(gRef.current);

    if (disableAnimation) {
      // fix any
      gridGroup.call(axis as any);
    } else {
      // fix any
      gridGroup
        .transition()
        .duration(750)
        .ease(easeLinear)
        .call(axis as any);
    }
    gridGroup.select(".domain").remove();
    gridGroup.selectAll("text").remove();
    gridGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.1)");
  }, [scale, ticks, disableAnimation]);
  return <g ref={gRef} transform={transform}></g>;
}

export function Axis({
  axisType,
  scale,
  ticks,
  transform,
  disableAnimation,
}: AxisProps) {
  const gRef = useRef<SVGGElement>(null);
  useEffect(() => {
    const axisGenerator = axisType === "x" ? axisBottom : axisLeft;
    const axis = axisGenerator(scale).ticks(ticks);
    const axisGroup = select(gRef.current);
    if (disableAnimation) {
      // fix any
      axisGroup.call(axis as any);
    } else {
      // fix any
      axisGroup
        .transition()
        .duration(750)
        .ease(easeLinear)
        //.attr("x", 0)
        .call(axis as any);
    }
    // axisGroup.select(".domain").remove();
    // axisGroup.selectAll("line").remove();
    /*     axisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "white")
      .attr("font-size", "0.75rem"); */
  }, [scale, ticks, disableAnimation]);
  return <g ref={gRef} transform={transform}></g>;
}
