import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Link as ChakraLink,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { fetchGame } from "../utils/idb";
import mockData from "../assets/data.json";
import {
  createScoreTableArray,
  createScoreTableDictionary,
} from "../utils/dataTransform";

export const Route = createFileRoute("/game/$gameId")({
  loader: async ({ params }) => {
    const game = await fetchGame(params.gameId);
    if (!game) {
      throw notFound();
    }
    return game;
  },
  component: Game,
  notFoundComponent: () => <GameNotFound />,
});

const mockPartialScores = [
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

const mockPlayerList = ["MG", "RYAN", "MARC", "JAMES", "MD", "EDD", "PAUL"];
const mockHoles = 18;

function Game() {
  // const { gameId } = Route.useParams();
  // prob need gameId for when we set the data back to idb so keep it around for now
  const data = Route.useLoaderData();
  // TODO, do i want to have the data as a dictionary or as an array for easier rendering
  const [scoreState, setScoreState] = useState(() => {
    const dictionaryLike = createScoreTableDictionary(
      mockHoles,
      mockPlayerList
    );
    //const arrayLike = createScoreTableArray(mockHoles, mockPlayerList);
    // mockData
    mockPartialScores.forEach((record) => {
      // name, hole, score
      dictionaryLike[record.hole][record.name].score = record.score;
      // arrayLike[record.hole-1][record.name].score = record.score
    });
    return dictionaryLike;
  });

  // setScoreState will be used by form elements from a modal to update the scoreState
  // after a debounce timer we will update the idb with the new scoreState

  //console.log(arrayLike);
  console.log(scoreState);
  // console.log(data);
  // console.log(data.scores);
  // console.log(mockData.sort((a, b) => a.hole - b.hole));
  const findPlayerScore = (player: string, hole: number) => {
    return data.scores?.find((rec) => rec.name === player && rec.hole === hole);
  };
  // maybe have to put scores into state and order them to make rendering and updating less intensive

  return (
    <Box maxW={{ md: "40rem" }} margin={{ md: "auto" }}>
      <TableContainer>
        <Table>
          <TableCaption>
            {data.complete ? "complete" : "in progress"}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Hole</Th>
              {data.playerList.map((player) => {
                return <Th key={player}>{player}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {Array(data.holes)
              .fill(0)
              .map((_, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    {data.playerList.map((player) => {
                      return (
                        <Td key={player}>
                          {findPlayerScore(player, idx + 1)?.score || "-"}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// so for each cell, should it be a button
// or should it just be, clicking row opens a modal with a form to update scores
// could we have it so every cell is a button, opens up the same form
// but depending which button was clicked, "focused" player is set from the button clicked

function GameNotFound() {
  return (
    <Box maxW={{ md: "40rem" }} margin={{ md: "auto" }}>
      <Alert status="info">
        <VStack>
          <HStack>
            <AlertIcon />
            <AlertTitle>Hey, we cannot find that game.</AlertTitle>
          </HStack>
          <AlertDescription>
            Remember, game data is stored locally in your browser, so if you are
            trying a link from another person or another device you will need to{" "}
            <ChakraLink to="/settings" textDecoration="underline" as={Link}>
              import their game data
            </ChakraLink>
          </AlertDescription>
        </VStack>
      </Alert>
    </Box>
  );
}
