import { IDataset, IScore } from "../models/data";

export function splitIntoDatasets(data: IScore[]) {
  const sets: IDataset[] = [];
  const hitKey: string[] = [];
  data.forEach((d) => {
    if (hitKey.includes(d.name)) {
      const found = sets.find((e) => e.label === d.name);
      if (!found) return;
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

export const promiseFileReader = (file: File) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = (err) => reject(err);
    fr.readAsText(file);
  });

export const promiseJSONParse = (content: string) =>
  new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(content);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
