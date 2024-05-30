import { entries, get, set } from "idb-keyval";
import { IScore } from "../models/data";

type NewGame = {
  description: string;
  location: string;
  date: string;
  maxShots: number;
  holes: number;
  playerList: string[];
};

type RecordResponse = {
  success: boolean;
  message: string | Error;
};

export async function createRecord(data: NewGame): Promise<RecordResponse> {
  const timeStamp = new Date().toISOString();
  const record: IDBProperties = {
    description: data.description,
    location: data.location,
    date: data.date,
    maxShots: data.maxShots,
    holes: data.holes,
    playerList: data.playerList,
    scores: [],
    created: timeStamp,
    updated: timeStamp,
    complete: false,
  };
  const uuid = self.crypto.randomUUID();
  return set(uuid, record)
    .then(() => {
      return { success: true, message: uuid };
    })
    .catch((error) => {
      return { success: false, message: error };
    });
}

export type IDBRecord = {
  [key: string]: IDBProperties;
};

export type IDBProperties = {
  description: string;
  location: string;
  date: string;
  maxShots: number;
  holes: number;
  playerList: string[];
  scores: IScore[];
  created: string;
  updated: string;
  complete: boolean;
};

export async function getIncompleteGames() {
  const incompleteGames: IDBRecord[] = [];
  await entries<string, IDBProperties>().then((allGames) => {
    allGames.forEach(([key, value]) => {
      if (!value.complete) {
        // if we find any incomplete games pass them back so we can show the user
        incompleteGames.push({ [key]: value });
      }
    });
  });
  return incompleteGames;
}

export async function getAllGames() {
  return await entries<string, IDBProperties>().then((allGames) =>
    allGames.map(([key, value]) => ({ [key]: value }))
  );
}

export async function getGame(
  gameId: string
): Promise<IDBProperties | undefined> {
  return await get(gameId);
}

export async function setScores(
  gameId: string,
  scores: IScore[]
): Promise<RecordResponse> {
  return await get(gameId).then((record) => {
    if (record) {
      record.scores = scores;
      record.updated = new Date().toISOString();
      return set(gameId, record)
        .then(() => {
          return { success: true, message: "Scores updated" };
        })
        .catch((error) => {
          return { success: false, message: error };
        });
    } else {
      return { success: false, message: "Game not found" };
    }
  });
}

export async function setDetails(
  gameId: string,
  details: Partial<IDBProperties>
) {
  return await get(gameId).then((record) => {
    if (record) {
      const newRecord = {
        ...record,
        ...details,
        updated: new Date().toISOString(),
      };
      return set(gameId, newRecord)
        .then(() => {
          return { success: true, message: "Details updated" };
        })
        .catch((error) => {
          return { success: false, message: error };
        });
    } else {
      return { success: false, message: "Game not found" };
    }
  });
}
