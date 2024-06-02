import { useRef, useState } from "react";
import { Legend } from "../../components/charts/Legend";
import useResizeObserver from "../../hooks/useResizeObserver";
import { LineChart } from "../../components/charts/LineChart";
import { Settings } from "../../components/charts/Settings";
import { IScore } from "../../models/data";
import { Player } from "../game/model";

interface ChartWrapperProps {
  data: IScore[];
  totalHoles: number;
  shotLimitPerHole: number;
  playerList: Player[];
}

export function ChartWrapper({
  data,
  totalHoles,
  shotLimitPerHole,
  playerList,
}: ChartWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { height, width } = useResizeObserver(wrapperRef);
  const legendData = [...new Set(data.map((data) => data.name))];
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

  const [cumulative, setCumulative] = useState(false);

  const chartData = data.filter((d) => showing.includes(d.name));

  return (
    <>
      <div>
        <Legend
          data={legendData}
          onChange={onChangeShowing}
          showing={showing}
          toggleShowingAll={toggleShowingAll}
          playerList={playerList}
        />
        <div ref={wrapperRef} className="wrapper">
          <LineChart
            initialData={chartData}
            cumulative={cumulative}
            height={height}
            width={width}
            shotLimitPerHole={shotLimitPerHole}
            totalHoles={totalHoles}
            playerList={playerList}
          />
          <Settings
            wrapperRef={wrapperRef.current}
            height={height}
            width={width}
          />
        </div>
        <div id="portal-root"></div>
      </div>
      <label className="checkbox">
        <input
          type="checkbox"
          value={cumulative ? "overall score" : "by hole"}
          checked={cumulative}
          onChange={() => setCumulative(!cumulative)}
        />
        cumulative
      </label>
    </>
  );
}
