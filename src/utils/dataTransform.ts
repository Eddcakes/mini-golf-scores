import { PlayerList } from "../models/data";

export interface PlayerScore {
  [key: string]: number | null;
}

export const createScoreTableArray = (
  holes: number,
  playerList: PlayerList
) => {
  return Array.from(Array(holes).keys()).map(() => {
    const playerScore: PlayerScore = {};
    playerList.forEach((player) => {
      playerScore[player.name] = null;
    });
    return playerScore;
  });
};

interface ScoreTableDictionary {
  [key: number]: PlayerScore;
}

// not used
export const createScoreTableDictionary = (
  holes: number,
  playerList: string[]
) => {
  const dictionary: ScoreTableDictionary = {};
  for (let ii = 0; ii < holes; ii++) {
    const playerScore: PlayerScore = {};
    playerList.forEach((player) => {
      playerScore[player] = null;
    });
    dictionary[ii + 1] = playerScore;
  }
  return dictionary;
};

export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};
