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
  useDisclosure,
} from "@chakra-ui/react";
import { fetchGame } from "../utils/idb";
import { createScoreTableArray } from "../utils/dataTransform";
import { ScoreModal } from "../components/game/ScoreModal";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalForIndex, setModalForIndex] = useState<number | null>(null);
  const [scoreState, setScoreState] = useState(() => {
    // format the data so we can render in a table much easier
    const arrayLike = createScoreTableArray(data.holes, data.playerList);
    // set scores from idb data
    data.scores.forEach((record) => {
      arrayLike[record.hole - 1][record.name] = record.score;
    });
    return arrayLike;
  });
  const openScoreModal = (scoreIndex: number) => {
    setModalForIndex(scoreIndex);
    onOpen();
  };
  const resetModalFor = () => {
    setModalForIndex(null);
    onClose();
  };

  const updateScores = () => {
    // event.preventDefault();
    // kinda need the prevent default so we can do validation
    // update the scoreState with the new scores
    // then update the idb with the new scores
    // then close the modal
    // then reset the modalFor state
    console.log("submitting scores for hole");
  };

  // after a debounce timer we will update the idb with the new scoreState

  console.log(scoreState);
  // console.log(data);

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
                      return data.complete ? (
                        <Td key={player}>{hole[player] || "-"}</Td>
                      ) : (
                        <Td
                          key={player}
                          role="button"
                          onClick={() => openScoreModal(idx)}
                        >
                          {hole[player] || "-"}
                        </Td>
                      );
                    })
                  }
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <ScoreModal
        updateScores={updateScores}
        scoreState={scoreState}
        isOpen={isOpen}
        resetModalFor={resetModalFor}
        modalForIndex={modalForIndex}
        maxShots={data.maxShots}
      />
    </Box>
  );
}

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
