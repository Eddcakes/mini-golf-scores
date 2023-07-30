import { useRef } from "react";
import { IScore } from "../../models/data";
import { splitIntoDatasets } from "../../utils/data";
import { getXScale, getYScale } from "../../utils/charts";
import { Axis } from "./Grid";
import { AnimationType, Line } from "./Line";
import { colorDictionary } from "../../utils/svg";
import { Overlay } from "./Overlay";
import { Tooltip } from "./Tooltip";
import "./LineChart.css";

interface LineChartProps {
  initialData: IScore[];
  cumulative: boolean;
  width: number;
  height: number;
}

export function LineChart({
  initialData,
  cumulative = false,
  width,
  height,
}: LineChartProps) {
  const overlayRef = useRef<SVGRectElement>(null);
  const scrollBreakpoint = 770;
  const margin = 48;
  const svgWidth = width < scrollBreakpoint ? 1200 : width;
  const svgHeight = height;
  const minHole = 1;
  const maxHole = 18;
  const minShot = 0; // min<IScore, number>(data, (d) => d.score); //could -1
  const maxShot = cumulative ? 100 : 10; // max<IScore, number>(data, (d) => d.score); //could + however many
  const xScale = getXScale(minHole, maxHole, svgWidth - margin);
  const yScale = getYScale(minShot, maxShot, svgHeight - margin);

  let data: IScore[] = [];
  if (cumulative) {
    const cumulativeScoreMap: Record<string, number> = {};
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

  return (
    <div>
      <svg className="y-axis" height={svgHeight} width={100}>
        <Axis
          axisType="y"
          scale={yScale}
          ticks={(cumulative ? 10 : maxShot) / 2}
          disableAnimation={false}
          transform=""
        />
      </svg>
      <div style={{ overflowX: "scroll" }}>
        <svg className="line-chart" height={svgHeight} width={svgWidth}>
          {datasets.map(({ label, data }) => {
            return (
              <Line
                key={label}
                data={data}
                xScale={xScale}
                yScale={yScale}
                color={colorDictionary[label] || "black"}
                animation={AnimationType.LEFT}
              />
            );
          })}

          <Overlay ref={overlayRef} width={svgWidth} height={svgHeight}>
            <Axis
              axisType="x"
              scale={xScale}
              ticks={maxHole}
              disableAnimation={false}
              // why doesn't this work
              // .attr("transform", `translateY(${dims.height}px)`)
              transform={`translate(0, ${svgHeight - margin})`}
              anchorEl={overlayRef.current}
            />
            <Tooltip
              anchorEl={overlayRef.current}
              data={datasets}
              height={svgHeight - margin}
              width={width}
              xScale={xScale}
              yScale={yScale}
            />
          </Overlay>
        </svg>
      </div>
    </div>
  );
}
