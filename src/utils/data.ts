import { IDataset, IScore } from "../models/data";

// no longer using cumulative param here, should remove
export function splitIntoDatasets(data: IScore[], cumulative = false) {
  let sets: IDataset[] = [];
  let hitKey: string[] = [];
  data.forEach((d) => {
    if (hitKey.includes(d.name)) {
      let found = sets.find((e) => e.label === d.name);
      if (!found) return;
      if (cumulative) {
        const len = found?.data.length;
        if (len != null) {
          const cumulativeScore = found?.data[len - 1].score + d.score;
          found?.data.push({ ...d, score: cumulativeScore });
        } else {
          found?.data.push(d);
        }
        return;
      }
      found?.data.push(d);
    } else {
      hitKey.push(d.name);
      sets.push({
        label: d.name,
        data: [d],
      });
    }
  });
  return sets;
}

export function scoresArray(data: IScore[]) {
  return data.reduce((acc: number[], cur: IScore) => [...acc, cur.score], []);
}

export const formatTooltipText = (details: IScore) => {
  return `${details.name}
  ${details.hole}
  ${details.score}`;
};
