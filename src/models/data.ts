export interface IData {
  data: IScore[];
}

export interface IScore {
  name: string;
  hole: number;
  score: number;
}

export interface IDataset {
  label: string;
  data: number[];
}
