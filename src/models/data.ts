import { z } from "zod";

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

export const zPlayer = z.object({
  name: z.string(),
  color: z.string().length(7).startsWith("#"),
});

export const zScore = z.object({
  name: z.string(),
  hole: z.number(),
  score: z.number(),
  par: z.number().nullable(),
});

export const zIdbValue = z.object({
  archived: z.boolean(),
  complete: z.boolean(),
  created: z.string().date(),
  date: z.string().date(),
  description: z.string(),
  holes: z.number(),
  location: z.string(),
  maxShots: z.number(),
  playerList: z.array(zPlayer),
  scores: z.array(zScore),
  updated: z.string().date(),
});

export const zIdbRecord = z.record(z.string(), zIdbValue);

export const zIdbRecordArray = z.array(zIdbRecord);

export type ImportData = z.infer<typeof zIdbRecordArray>;
