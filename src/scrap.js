// turn it into a dictionary
// or just turn into a state like object hole as key

// {1: {player: '', score: ''}}
const holes = 18;
const playerList = ["MG", "RYAN", "MARC", "JAMES", "MD", "EDD", "PAUL"];
const partial = [
  { name: "MG", hole: 1, score: 2 },
  { name: "MG", hole: 2, score: 6 },
  { name: "MG", hole: 3, score: 2 },
  { name: "MG", hole: 4, score: 2 },
  { name: "MG", hole: 5, score: 2 },
  { name: "MG", hole: 6, score: 2 },
  { name: "MG", hole: 7, score: 2 },
  { name: "MG", hole: 8, score: 1 },
  { name: "MG", hole: 9, score: 3 },

  { name: "RYAN", hole: 1, score: 2 },
  { name: "RYAN", hole: 2, score: 3 },
  { name: "RYAN", hole: 3, score: 2 },
  { name: "RYAN", hole: 4, score: 3 },
  { name: "RYAN", hole: 5, score: 3 },
  { name: "RYAN", hole: 6, score: 2 },
  { name: "RYAN", hole: 7, score: 2 },
  { name: "MARC", hole: 1, score: 2 },
  { name: "MARC", hole: 2, score: 3 },
  { name: "MARC", hole: 3, score: 3 },
  { name: "MARC", hole: 4, score: 2 },
  { name: "MARC", hole: 5, score: 2 },
  { name: "JAMES", hole: 1, score: 2 },
  { name: "MD", hole: 1, score: 2 },
  { name: "MD", hole: 2, score: 3 },
  { name: "MD", hole: 3, score: 4 },
  { name: "MD", hole: 4, score: 2 },
  { name: "MD", hole: 5, score: 2 },
  { name: "MD", hole: 6, score: 1 },
  { name: "MD", hole: 7, score: 3 },
  { name: "MD", hole: 8, score: 1 },
  { name: "EDD", hole: 1, score: 3 },
  { name: "EDD", hole: 2, score: 3 },
  { name: "EDD", hole: 3, score: 2 },
  { name: "EDD", hole: 4, score: 6 },
  { name: "EDD", hole: 5, score: 1 },
  { name: "EDD", hole: 6, score: 2 },
  { name: "EDD", hole: 7, score: 2 },
  { name: "EDD", hole: 8, score: 1 },
  { name: "PAUL", hole: 1, score: 4 },
  { name: "PAUL", hole: 2, score: 7 },
  { name: "PAUL", hole: 3, score: 4 },
  { name: "PAUL", hole: 4, score: 4 },
];

const arrayTable = Array.from(
  Array(holes)
    .keys()
    .map((val) => ({ [val + 1]: {} }))
);
const smallerArrayTable = Array.from(
  Array(holes)
    .keys()
    .map((val) => {
      let playerScore = {};
      playerList.forEach((player) => {
        playerScore[player] = { score: undefined };
      });
      return playerScore;
      //{
      //[val+1]: {},
      //"dog": "something"}
      //  {...playerScore}
    })
);
/* .map(val => {
	// object for each player
  		let playerScore = {}
    playerList.forEach( player => {
    	playerScore[player] = {score: undefined}
    })
    console.log(playerScore)
    return {val: playerScore}
})
*/
const loopTable = {};
const mapTable = new Map();
for (let ii = 0; ii < holes; ii++) {
  let playerScore = {};
  playerList.forEach((player) => {
    playerScore[player] = { score: undefined };
  });
  loopTable[ii + 1] = playerScore;
  mapTable.set(ii + 1, playerScore);
}

// Array(holes).fill()
// oh i dont want an array, i want an object with the key
// console.log(arrayTable)
// console.log(loopTable)
// console.log(mapTable)

partial.forEach((record) => {
  // name, hole, score
  loopTable[record.hole][record.name].score = record.score; // { {"MG": {}, "RYAN":{} }
  // mapTable.set(record.hole, )
  smallerArrayTable[record.hole - 1][record.name].score = record.score;
});
console.log(loopTable);
console.log(smallerArrayTable);
