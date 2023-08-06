export interface IScore {
  name: string;
  hole: number;
  score: number;
}

export interface IDataset {
  label: string;
  data: IScore[];
}
