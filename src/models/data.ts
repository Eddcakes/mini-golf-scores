export interface IScore {
  name: string;
  hole: number;
  score: number;
  par: number | null;
}

export interface IDataset {
  label: string;
  data: IScore[];
}

interface Player {
  name: string;
  color: string;
}

export type PlayerList = Player[];
