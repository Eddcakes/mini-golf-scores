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
import { fetchGame, updateScores } from "../utils/idb";
import {
  PlayerScore,
  clamp,
  createScoreTableArray,
} from "../utils/dataTransform";
import { ScoreModal } from "../components/game/ScoreModal";
import { IScore } from "../models/data";

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
  const { gameId } = Route.useParams();
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

  const publishScores = async (updatedScoreState: PlayerScore[]) => {
    // transform the updatedScoreState back into the IScore[] format
    const newScores: IScore[] = [];
    updatedScoreState.forEach((record, idx) => {
      const hole = idx + 1;
      Object.entries(record).forEach(([name, score]) => {
        if (score == null) return;
        newScores.push({
          hole: hole,
          name: name,
          score: clamp(score, 0, data.maxShots),
        });
      });
    });

    const updating = await updateScores(gameId, newScores);
    if (updating.success) {
      setScoreState(updatedScoreState);
      onClose();
      setModalForIndex(null);
    } else {
      console.error("failed to update scores", updating.message);
    }
  };
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
        updateScores={publishScores}
        scoreState={scoreState}
        isOpen={isOpen}
        resetModalFor={resetModalFor}
        modalForIndex={modalForIndex}
        maxShots={data.maxShots}
      />
    </Box>
  );
}

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
