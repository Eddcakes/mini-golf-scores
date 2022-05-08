import { useEffect, useRef } from "react";
import { select, scaleLinear, line, axisBottom, axisLeft } from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import "./Scores.css";
import { IData, IScore } from "../models/data";
import { splitIntoDatasets } from "../utils/data";
import { mapColors } from "../utils/svg";

export function Scores({ data }: IData) {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const dims = useResizeObserver(wrapperRef);
  const datasets = splitIntoDatasets(data);

  useEffect(() => {
    console.log(data);
    console.log(datasets);
    const svg = select(svgRef.current);
    if (!dims) return;

    const minHole = 1;
    const maxHole = 18;
    const minShot = 0; // min(data, (d)=> d.score)
    const maxShot = 10; //max(data, (d)=> d.score)

    const xScale = scaleLinear()
      .domain([minHole, maxHole])
      .range([0, dims.width]);
    const yScale = scaleLinear()
      .domain([maxShot, minShot])
      .range([0, dims.height]);

    const createPath = line<IScore>()
      .x((d) => xScale(d.hole))
      .y((d) => yScale(d.score));

    svg.attr("width", dims.width).attr("height", dims.height);

    datasets.forEach((player) => {
      svg
        .selectAll(`.${player.label}-shot`)
        .data(player.data)
        .join("circle")
        .attr("class", `${player.label}-shot`)
        .attr(
          "stroke",
          mapColors.find((c) => c.name === player.label)?.color || "black"
        )
        .attr(
          "fill",
          mapColors.find((c) => c.name === player.label)?.color || "black"
        )
        .attr("r", 3)
        .attr("cx", (shot) => xScale(shot.hole))
        .attr("cy", (shot) => yScale(shot.score));

      svg
        .selectAll(`.${player.label}-line`)
        .data([player.data])
        .join("path")
        .attr("class", `${player.label}-line`)
        .attr(
          "stroke",
          mapColors.find((c) => c.name === player.label)?.color || "black"
        )
        .attr("fill", "none")
        .attr("d", createPath);
    });

    const xAxis: any = axisBottom(xScale).ticks(maxHole);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dims.height}px)`)
      .call(xAxis);
    const yAxis: any = axisLeft(yScale).ticks(maxShot);
    svg
      .select(".y-axis")
      //.style("transform", `translateX(${dims.Width}px)`)
      .call(yAxis);
  }, [dims?.height, dims?.width]);

  return (
    <div ref={wrapperRef} className="wrapper">
      <svg ref={svgRef}>
        <g className="y-axis" />
        <g className="x-axis" />
      </svg>
    </div>
  );
}
