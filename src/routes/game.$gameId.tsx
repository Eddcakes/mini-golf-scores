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
import { createScoreTableArray } from "../utils/dataTransform";

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

function Game() {
  // const { gameId } = Route.useParams();
  // prob need gameId for when we set the data back to idb so keep it around for now
  const data = Route.useLoaderData();
  const [scoreState, setScoreState] = useState(() => {
    // format the data so we can render in a table much easier
    const arrayLike = createScoreTableArray(data.holes, data.playerList);
    // set scores from idb data
    data.scores.forEach((record) => {
      arrayLike[record.hole - 1][record.name] = record.score;
    });
    return arrayLike;
  });

  // setScoreState will be used by form elements from a modal to update the scoreState
  // after a debounce timer we will update the idb with the new scoreState

  //console.log(arrayLike);
  console.log(scoreState);
  console.log(data);
  // console.log(data.scores);

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
            {scoreState.map((hole, idx) => {
              return (
                <Tr key={idx}>
                  <Td>hole {idx + 1}</Td>
                  {
                    // could do Object.keys() ES2015^ does keep insertion order
                    data.playerList.map((player) => {
                      return <Td key={player}>{hole[player] || "-"}</Td>;
                    })
                  }
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
