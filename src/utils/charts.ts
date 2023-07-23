import {
  ScaleLinear,
  axisBottom,
  axisLeft,
  easeLinear,
  line,
  scaleLinear,
  select,
  Selection,
} from "d3";
import { IDataset, IScore } from "../models/data";
import { colorDictionary } from "./svg";

type XScale = ScaleLinear<number, number>;
type YScale = ScaleLinear<number, number>;

export const getXScale = (min: number, max: number, width: number): XScale =>
  scaleLinear().domain([min, max]).range([0, width]);

export const getYScale = (min: number, max: number, height: number): YScale =>
  scaleLinear().domain([max, min]).range([0, height]);

const applyAxisStyles = (
  container: Selection<SVGSVGElement | null, unknown, null, undefined>
) => {
  container.select(".domain").remove();
  container.selectAll("line").attr("stroke", "rgba(255,255, 0.2)");
  return container
    .selectAll("text")
    .attr("opacity", 0.5)
    .attr("color", "white") // axis font color
    .attr("font-size", "0.75rem");
};

interface DrawAxis {
  container: Selection<SVGSVGElement | null, unknown, null, undefined>;
  scale: XScale | YScale;
  ticks: number;
}
interface DrawXAxis extends DrawAxis {
  height: number;
}
export const drawXAxis = ({ container, scale, ticks, height }: DrawXAxis) => {
  const xAxis = axisBottom(scale).ticks(ticks);
  return (
    container
      .append("g")
      // why doesnt this work
      // .attr("transform", `translateY(${dims.height}px)`)
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
    // .select(".domain").remove() //hide the connecting line
  );
};

export const drawYAxis = ({ container, scale, ticks }: DrawAxis) => {
  const yAxis = axisLeft(scale).ticks(ticks);
  return container.append("g").call(yAxis);
  // .select(".domain").remove() //hide the connecting line
};

// IDataset, HTMLElement, IScore[] ?
// Selection<SVGSVGElement, IDataset, HTMLElement | null, any>;
interface DrawLine {
  container: Selection<SVGSVGElement | null, unknown, null, undefined>;
  data: IDataset;
  xScale: XScale;
  yScale: YScale;
}

export const drawLine = ({
  container,
  data,
  xScale,
  yScale,
}: DrawLine): Selection<SVGPathElement, any, any, any> => {
  const createPath = line<IScore>()
    .x((d) => xScale(d.hole))
    .y((d) => yScale(d.score));
  return container
    .append("path")
    .datum(data)
    .attr("class", `line`)
    .attr("stroke", (d) => colorDictionary[d.label] || "black")
    .attr("stroke-width", 3)
    .attr("fill", "none")
    .attr("d", (d) => createPath(d.data));
};

interface AnimateLine {
  element: SVGPathElement;
  transitionTime: number;
}

export const animateLine = ({ element, transitionTime }: AnimateLine) => {
  const length = element.getTotalLength();
  return select(element)
    .attr("stroke-dasharray", `${length},${length}`)
    .attr("stroke-dashoffset", length)
    .transition()
    .duration(transitionTime)
    .ease(easeLinear)
    .attr("stroke-dashoffset", 0);
};
