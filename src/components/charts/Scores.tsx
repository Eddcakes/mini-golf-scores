import { useEffect, useRef, useState } from "react";
import { select } from "d3";
import useResizeObserver from "../../hooks/useResizeObserver";
import "./Scores.css";
import { IScore } from "../../models/data";
import { splitIntoDatasets } from "../../utils/data";
import { Tooltip } from "./Tooltip";
import {
  animateLine,
  drawLine,
  drawXAxis,
  drawYAxis,
  getXScale,
  getYScale,
} from "../../utils/charts";

interface ScoresProps {
  initialData: IScore[];
  cumulative: boolean;
}

export function Scores({ initialData, cumulative = false }: ScoresProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dims = useResizeObserver(wrapperRef);
  const [prevItems, setPrevItems] = useState<string[]>([]);
  let data: IScore[] = [];
  if (cumulative) {
    let cumulativeScoreMap: Record<string, number> = {};
    const cumulativeData = initialData.map((d) => {
      const { name, score } = d;
      cumulativeScoreMap[name] = (cumulativeScoreMap[name] || 0) + score;
      return { ...d, score: cumulativeScoreMap[name] };
    });
    data = cumulativeData;
  } else {
    data = initialData;
  }
  const datasets = splitIntoDatasets(data);
  const minHole = 1;
  const maxHole = 18;
  const minShot = 0; // min<IScore, number>(data, (d) => d.score); //could -1
  const maxShot = cumulative ? 100 : 10; // max<IScore, number>(data, (d) => d.score); //could + however many

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dims || !svg) return;
    const xScale = getXScale(minHole, maxHole, dims.width);
    const yScale = getYScale(minShot, maxShot, dims.height);
    const transitionTime = 750;

    svg.selectAll("*").remove();

    datasets.forEach((d) => {
      const line = drawLine({ container: svg, data: d, xScale, yScale });
      if (!prevItems.includes(d.label)) {
        // come back to the !, trying to type d3 and refs
        animateLine({ element: line.node()!, transitionTime });
      }
    });

    setPrevItems(datasets.map(({ label }) => label));
  }, [initialData, dims?.height, dims?.width]);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dims) return;
    const xScale = getXScale(minHole, maxHole, dims.width);
    const yScale = getYScale(minShot, maxShot, dims.height);
    drawXAxis({
      container: svg,
      scale: xScale,
      ticks: maxHole,
      height: dims.height,
    });

    drawYAxis({
      container: svg,
      scale: yScale,
      ticks: cumulative ? 10 : maxShot,
    });
  }, [initialData, dims?.height, dims?.width]);

  return (
    <div ref={wrapperRef} className="wrapper">
      <svg ref={svgRef} className="line-chart"></svg>
      <Tooltip />
    </div>
  );
}
