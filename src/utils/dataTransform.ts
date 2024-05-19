interface PlayerScore {
  [key: string]: { score: number | undefined };
}

export const createScoreTableArray = (holes: number, playerList: string[]) => {
  return Array.from(Array(holes).keys()).map(() => {
    const playerScore: PlayerScore = {};
    playerList.forEach((player) => {
      playerScore[player] = { score: undefined };
    });
    return playerScore;
  });
};

interface ScoreTableDictionary {
  [key: number]: PlayerScore;
}

export const createScoreTableDictionary = (
  holes: number,
  playerList: string[]
) => {
  const dictionary: ScoreTableDictionary = {};
  for (let ii = 0; ii < holes; ii++) {
    const playerScore: PlayerScore = {};
    playerList.forEach((player) => {
      playerScore[player] = { score: undefined };
    });
    dictionary[ii + 1] = playerScore;
  }
  return dictionary;
};
