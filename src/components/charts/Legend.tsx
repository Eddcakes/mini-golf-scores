import { mapColors } from "../../utils/svg";
import { Button } from "../Button";
import "./Legend.css";

interface LegendProps {
  data: string[];
  showing: string[];
  onChange: (name: string) => void;
  toggleShowingAll: () => void;
}

export const Legend = ({
  data,
  showing,
  onChange,
  toggleShowingAll,
}: LegendProps) => {
  return (
    <div className="legend">
      <Button
        onClick={toggleShowingAll}
        text={showing.length > 0 ? "Uncheck all" : "Check all"}
        variant="primary"
      />

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
                    mapColors.find((c) => c.name === d)?.color || "#000",
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
