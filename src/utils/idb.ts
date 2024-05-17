import { entries, get, set } from "idb-keyval";
import { IScore } from "../models/data";

type NewGame = {
  description: string;
  location: string;
  date: string;
  maxShots: number;
  playerList: string[];
  // data: IScore[];
};

type RecordResponse = {
  success: boolean;
  message: string | Error;
};

export async function createRecord(data: NewGame): Promise<RecordResponse> {
  const timeStamp = new Date().toISOString();
  const record = {
    description: data.description,
    location: data.location,
    date: data.date,
    maxShots: data.maxShots,
    playerList: data.playerList,
    data: [],
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

type IDBProperties = {
  description: string;
  location: string;
  date: string;
  maxShots: number;
  playerList: string[];
  data: IScore[];
  created: string;
  updated: string;
  complete: string;
};

export async function checkForIncompleteGame() {
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

export async function fetchGame(
  gameId: string
): Promise<IDBProperties | undefined> {
  return await get(gameId);
}
