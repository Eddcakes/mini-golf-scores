import { useCallback, useEffect, useRef } from "react";
import { bisector, max, pointer, select, selectAll } from "d3";
import { IDataset, IScore } from "../../models/data";
import { XScale, YScale } from "../../utils/charts";
import "./Tooltip.css";

interface TooltipProps {
  xScale: XScale;
  yScale: YScale;
  width: number;
  height: number;
  data: IDataset[];
  anchorEl: SVGRectElement | null;
  colorDictionary: Record<string, string>;
}

export function Tooltip({
  xScale,
  yScale,
  width,
  height,
  data,
  anchorEl,
  colorDictionary,
}: TooltipProps) {
  const tooltipRef = useRef<SVGGElement>(null);
  const drawLine = useCallback(
    (x: number) => {
      select(tooltipRef.current)
        .select(".tooltip-line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", 0)
        .attr("y2", height);
    },

    [tooltipRef, height]
  );

  const drawContent = useCallback(
    (x: number, pointerPosX: number) => {
      const tooltipContent = select(tooltipRef.current).select(
        ".tooltip-content"
      );
      tooltipContent.attr("transform", (_, i, nodes) => {
        const theNodes = nodes as SVGElement[];
        const tooltipWidth = theNodes[i]?.getBoundingClientRect()?.width || 0;
        const translateX =
          tooltipWidth + pointerPosX > width - 48
            ? x - tooltipWidth - 12
            : x + 8;
        return `translate(${translateX}, 0)`;
      });
      tooltipContent
        .select(".content-title")
        .text(`Hole: ${Math.round(xScale.invert(x))}`);
    },
    [xScale, width]
  );

  const drawBackground = useCallback(() => {
    const contentBackground = select(tooltipRef.current).select(
      ".content-background"
    );
    contentBackground.attr("width", 50).attr("height", 20);

    const tooltipContentElement = select(tooltipRef.current)
      .select(".tooltip-content")
      .node() as SVGElement;
    if (!tooltipContentElement) return;
    const contentSize = tooltipContentElement.getBoundingClientRect();
    contentBackground
      .attr("width", contentSize.width + 10)
      .attr("height", contentSize.height + 4);
  }, []);

  const onChangePosition = useCallback(
    (d: IScore, i: number, isVisible: boolean) => {
      selectAll(".score-value")
        .filter((_, tIndex) => tIndex === i)
        .text(isVisible ? d.score : "");
      // getting size max size of labels
      const maxLabelWidth = max(
        selectAll(".label").nodes() as SVGElement[],
        (node) => node.getBoundingClientRect().width
      );
      // translating by the max size of the labels so scores are in line
      selectAll(".score-value").attr("transform", () => {
        return `translate(${(maxLabelWidth || 40) + 20}, 3)`;
      });
    },
    []
  );

  const followPoints = useCallback(
    (event: MouseEvent) => {
      const pointerPositionX = event.clientX;
      // x is position relative to svg
      const [x] = pointer(event);
      const xHole = xScale.invert(x);
      const bisect = bisector((d: IScore) => d.hole).left;
      let baseXPos = 0;

      // draw points on the line
      select(tooltipRef.current)
        .selectAll(".tooltip-point")
        .attr("transform", (_, i) => {
          const index = bisect(data[i].data, xHole, 1);

          const d0 = data[i].data[index - 1];
          const d1 = data[i].data[index];
          const d = xHole - d0?.hole > d1?.hole - xHole ? d1 : d0;

          if (d.hole === undefined && d.score === undefined) {
            // move outside of container
            return "translate(-100, -100)";
          }
          const xPos = xScale(d.hole);
          if (i === 0) {
            baseXPos = xPos;
          }
          let isVisible = true;
          if (xPos !== baseXPos) {
            isVisible = false;
          }
          const yPos = yScale(d.score);
          onChangePosition(d, i, isVisible);

          return isVisible
            ? `translate(${xPos}, ${yPos})`
            : "translate(-100, -100)";
        });
      drawLine(baseXPos);
      // being lazy, if I want to use this I should store margin as a const or pass it through
      drawContent(baseXPos, pointerPositionX - 48);
      drawBackground();
    },
    [
      data,
      drawLine,
      drawContent,
      drawBackground,
      xScale,
      yScale,
      onChangePosition,
    ]
  );

  useEffect(() => {
    select(anchorEl)
      .on("mouseout.tooltip", () => {
        select(tooltipRef.current).attr("opacity", 0);
      })
      .on("mouseover.tooltip", () => {
        select(tooltipRef.current).attr("opacity", 1);
      })
      .on("mousemove.tooltip", (event) => {
        select(tooltipRef.current)
          .selectAll(".tooltip-point")
          .attr("opacity", 1);
        followPoints(event);
      });
  }, [anchorEl, followPoints]);

  if (!data?.length) return null;

  return (
    <g ref={tooltipRef} opacity={0}>
      <line className="tooltip-line" />
      <g className="tooltip-content">
        <rect className="content-background" rx={4} ry={4} opacity={0.2} />
        <text className="content-title" transform={"translate(4, 22)"} />
        <g className="content" transform="translate(4, 42)">
          {data.map(({ label }, i) => {
            return (
              <g key={label} transform={`translate(6,${22 * i})`}>
                <circle r={6} fill={colorDictionary[label] || "black"} />
                <text className="label" transform="translate(12, 4)">
                  {label}
                </text>
                <text className="score-value" opacity={0.5} />
              </g>
            );
          })}
        </g>
      </g>
      {data.map(({ label }) => {
        return (
          <circle
            className="tooltip-point"
            r={6}
            key={label}
            opacity={0}
            fill={colorDictionary[label]}
          />
        );
      })}
    </g>
  );
}
