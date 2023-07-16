import { useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  line,
  axisBottom,
  axisLeft,
  ScaleLinear,
} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";
import "./Scores.css";
import { IData, IScore } from "../models/data";
import { formatTooltipText, splitIntoDatasets } from "../utils/data";
import { mapColors } from "../utils/svg";
import { Tooltip } from "./Tooltip";

type XScale = ScaleLinear<number, number>;
type YScale = ScaleLinear<number, number>;

export function Scores({ data }: IData) {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const dims = useResizeObserver(wrapperRef);
  const datasets = splitIntoDatasets(data);
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dims) return;

    const minHole = 1;
    const maxHole = 18;
    const minShot = 0; // min<IScore, number>(data, (d) => d.score); //could -1
    const maxShot = 10; // max<IScore, number>(data, (d) => d.score); //could + however many

    const xScale: XScale = scaleLinear()
      .domain([minHole, maxHole])
      .range([0, dims.width]);
    const yScale: YScale = scaleLinear()
      .domain([maxShot, minShot])
      .range([0, dims.height]);

    const createPath = line<IScore>()
      .x((d) => xScale(d.hole))
      .y((d) => yScale(d.score));

    //svg.attr("width", dims.width).attr("height", dims.height);

    // next thing is to add the animation i guess, then do some styling cleanup/ add grid lines?

    const defaultRadius = 3;
    const transitionTime = 200;
    svg.selectAll("*").remove();
    const tooltip = select(".tooltip");
    datasets.forEach((player, idx) => {
      // circle points
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
        .attr("r", defaultRadius)
        .attr("cx", (shot) => xScale(shot.hole))
        .attr("cy", (shot) => yScale(shot.score))
        // can we make invisible bigger radius so hover doesnt have to be exact

        .on("mouseover", (event) => {
          // Filter dataset points with the same coordinates
          const sameCoordinatesData = data.filter((record) => {
            const targetData = event.target.__data__;
            return (
              record.hole === targetData.hole &&
              record.score === targetData.score
            );
          });

          // Extract names from the filtered dataset
          const tooltipContent = sameCoordinatesData
            .map((record) => formatTooltipText(record))
            .join("<br><br>");
          select(event.currentTarget)
            .transition()
            .duration(transitionTime)
            .attr("r", 6);
          tooltip
            .style("visibility", "visible")
            .style("top", event.pageY + 30 + "px")
            .style("left", event.pageX + 20 + "px")
            .html(tooltipContent);
        })

        .on("mouseout", (event) => {
          select(event.currentTarget)
            .transition()
            .duration(transitionTime)
            .attr("r", defaultRadius);
          tooltip.style("visibility", "hidden");
        });
      // lines
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

    const xAxis = axisBottom(xScale).ticks(maxHole);
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${dims.height})`)
      // why doesnt this work
      // .attr("transform", `translateY(${dims.height}px)`)
      .call(xAxis);

    xAxisGroup.select(".domain").remove(); //hide the connecting line

    const yAxis = axisLeft(yScale).ticks(maxShot);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
  }, [data, dims?.height, dims?.width]);

  return (
    <div ref={wrapperRef} className="wrapper">
      <svg ref={svgRef}></svg>
      <Tooltip />
    </div>
  );
}
