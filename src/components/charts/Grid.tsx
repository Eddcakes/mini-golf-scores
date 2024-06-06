import { useEffect, useRef } from "react";
import {
  axisBottom,
  axisLeft,
  bisector,
  easeLinear,
  pointer,
  select,
} from "d3";
import { XScale, YScale } from "../../utils/charts";
import "./Grid.css";

interface GridLineProps {
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
}: GridLineProps) {
  const gRef = useRef<SVGGElement>(null);
  useEffect(() => {
    const axisGenerator = axisType === "x" ? axisBottom : axisLeft;
    const axis = axisGenerator(scale).ticks(ticks);

    const gridGroup = select(gRef.current);

    if (disableAnimation) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gridGroup.call(axis as any);
    } else {
      gridGroup
        .transition()
        .duration(750)
        .ease(easeLinear)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .call(axis as any);
    }
    gridGroup.select(".domain").remove();
    gridGroup.selectAll("text").remove();
    gridGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.1)");
  }, [scale, ticks, disableAnimation, axisType]);
  return <g ref={gRef} transform={transform}></g>;
}

interface AxisProps {
  axisType: "x" | "y";
  scale: XScale | YScale;
  ticks: number;
  transform: string;
  disableAnimation: boolean;
  anchorEl?: SVGRectElement | null;
}

export function Axis({
  axisType,
  scale,
  ticks,
  transform,
  disableAnimation,
  anchorEl,
}: AxisProps) {
  const gRef = useRef<SVGGElement>(null);
  useEffect(() => {
    const axisGenerator = axisType === "x" ? axisBottom : axisLeft;
    const axis = axisGenerator(scale).ticks(ticks);
    const axisGroup = select(gRef.current);
    if (disableAnimation) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axisGroup.call(axis as any);
    } else {
      axisGroup
        .transition()
        .duration(750)
        .ease(easeLinear)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .call(axis as any);
    }
    // axisGroup.select(".domain").remove();
    // axisGroup.selectAll("line").remove();
    axisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("font-size", "0.75rem");
  }, [scale, ticks, disableAnimation, axisType]);

  useEffect(() => {
    if (!anchorEl) return;
    select(anchorEl)
      .on("mouseout.axisX", () => {
        select(gRef.current)
          .selectAll("text")
          .attr("opacity", 0.5)
          .style("font-weight", "normal");
      })
      .on("mousemove.axisX", (event) => {
        const [x] = pointer(event);
        const xHole = scale.invert(x);
        const textElements = select(gRef.current).selectAll("text");
        const data = textElements.data();
        const index = bisector((d) => d).center(data, xHole);
        textElements
          .attr("opacity", (_, i) => (i === index ? 1 : 0.5))
          .style("font-weight", (_, i) => (i === index ? "bold" : "normal"));
      });
  }, [anchorEl, scale]);

  return <g className="axis" ref={gRef} transform={transform}></g>;
}
