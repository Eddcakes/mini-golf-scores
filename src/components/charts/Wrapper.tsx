import { useRef, useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Legend } from "../../components/charts/Legend";
import useResizeObserver from "../../hooks/useResizeObserver";
import { LineChart } from "../../components/charts/LineChart";
import { IScore } from "../../models/data";
import { Player } from "../game/model";

interface ChartWrapperProps {
  data: IScore[];
  totalHoles: number;
  shotLimitPerHole: number;
  playerList: Player[];
}

type RadioOption = "hole" | "overall";

export function ChartWrapper({
  data,
  totalHoles,
  shotLimitPerHole,
  playerList,
}: ChartWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { height, width } = useResizeObserver(wrapperRef);
  const legendData = [...new Set(data.map((data) => data.name))];
  const [chartView, setChartView] = useState<RadioOption>("hole");
  const [showing, setShowing] = useState<string[]>(legendData);
  const onChangeShowing = (name: string) => {
    const newShowingItems = showing.includes(name)
      ? showing.filter((item) => item !== name)
      : [...showing, name];
    setShowing(newShowingItems);
  };

  const toggleShowingAll = () => {
    if (showing.length > 0) {
      uncheckAll();
    } else {
      checkAll();
    }
  };
  const checkAll = () => {
    setShowing([...legendData]);
  };
  const uncheckAll = () => {
    setShowing([]);
  };

  const chartData = data.filter((d) => showing.includes(d.name));

  return (
    <>
      <div>
        <div ref={wrapperRef} className="wrapper">
          <LineChart
            initialData={chartData}
            cumulative={chartView === "overall"}
            height={height}
            width={width}
            shotLimitPerHole={shotLimitPerHole}
            totalHoles={totalHoles}
            playerList={playerList}
          />
        </div>
        <div id="portal-root"></div>
        <Legend
          data={legendData}
          onChange={onChangeShowing}
          showing={showing}
          toggleShowingAll={toggleShowingAll}
          playerList={playerList}
        />
      </div>
      <RadioGroup
        value={chartView}
        onChange={(value) => setChartView(value as RadioOption)}
        colorScheme="orange"
      >
        <Stack spacing={5} direction="row">
          <Radio value="hole">By hole</Radio>
          <Radio value="overall">By Overall score</Radio>
        </Stack>
      </RadioGroup>
    </>
  );
}
