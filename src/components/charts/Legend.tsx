import { Button } from "@chakra-ui/react";
import { Player } from "../game/model";
import "./Legend.css";

interface LegendProps {
  data: string[];
  showing: string[];
  onChange: (name: string) => void;
  toggleShowingAll: () => void;
  playerList: Player[];
}

export const Legend = ({
  data,
  showing,
  onChange,
  toggleShowingAll,
  playerList,
}: LegendProps) => {
  return (
    <div className="legend">
      <Button onClick={toggleShowingAll} colorScheme="orange">
        {showing.length > 0 ? "Uncheck all" : "Check all"}
      </Button>

      {data.map((d) => {
        return (
          <div key={d}>
            <label className="checkbox">
              <input
                type="checkbox"
                value={d}
                checked={showing.includes(d)}
                onChange={() => onChange(d)}
                style={{
                  accentColor:
                    playerList.find((c) => c.name === d)?.color || "#000",
                }}
              />
              {d}
            </label>
          </div>
        );
      })}
    </div>
  );
};
