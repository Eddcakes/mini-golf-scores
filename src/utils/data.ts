import { IDataset, IScore } from "../models/data";

export function splitIntoDatasets(data: IScore[], cumulative = false) {
  let sets: IDataset[] = [];
  let hitKey: string[] = [];
  data.forEach((d) => {
    if (hitKey.includes(d.name)) {
      let found = sets.find((e) => e.label === d.name);
      if (cumulative) {
        const len = found?.data.length;
        if (len != null) {
          found?.data.push(found?.data[len - 1] + d.score);
        } else {
          found?.data.push(d.score);
        }
        return;
      }
      found?.data.push(d.score);
    } else {
      hitKey.push(d.name);
      sets.push({
        label: d.name,
        data: [d.score],
      });
    }
  });
  return sets;
}

export function scoresArray(data: IScore[]) {
  return data.reduce((acc: number[], cur: IScore) => [...acc, cur.score], []);
}
