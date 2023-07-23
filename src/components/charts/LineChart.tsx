import { useState } from "react";
import { IScore } from "../../models/data";
import { splitIntoDatasets } from "../../utils/data";
import { getXScale, getYScale } from "../../utils/charts";
import { Axis } from "./Grid";
import { AnimationType, Line } from "./Line";
import { colorDictionary } from "../../utils/svg";
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
  const svgWidth = width;
  const svgHeight = height;
  const minHole = 1;
  const maxHole = 18;
  const minShot = 0; // min<IScore, number>(data, (d) => d.score); //could -1
  const maxShot = cumulative ? 100 : 10; // max<IScore, number>(data, (d) => d.score); //could + however many
  const xScale = getXScale(minHole, maxHole, width);
  const yScale = getYScale(minShot, maxShot, height);
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

  return (
    <>
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
        <Axis
          axisType="x"
          scale={xScale}
          ticks={maxHole}
          disableAnimation={false}
          // why doesn't this work
          // .attr("transform", `translateY(${dims.height}px)`)
          transform={`translate(0, ${height})`}
        />
        <Axis
          axisType="y"
          scale={yScale}
          ticks={cumulative ? 10 : maxShot}
          disableAnimation={false}
          transform=""
        />
      </svg>
    </>
  );
}
