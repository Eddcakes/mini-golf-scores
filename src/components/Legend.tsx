import { mapColors } from "../utils/svg";
import "./Legend.css";

interface LegendProps {
  data: string[];
  showing: string[];
  onChange: (name: string) => void;
}

export const Legend = ({ data, showing, onChange }: LegendProps) => {
  return (
    <div className="legend">
      {data.map((d) => {
        return (
          <div className="checkbox" key={d}>
            <label>
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
