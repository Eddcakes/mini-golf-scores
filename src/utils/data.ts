import { IDataset, IScore } from "../models/data";

export function splitIntoDatasets(data: IScore[]) {
  let sets: IDataset[] = [];
  let hitKey: string[] = [];
  data.forEach((d) => {
    if (hitKey.includes(d.name)) {
      let found = sets.find((e) => e.label === d.name);
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
