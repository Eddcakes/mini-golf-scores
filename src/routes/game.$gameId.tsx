import { useState } from "react";
import {
  Link,
  createFileRoute,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Link as ChakraLink,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import {
  IDBProperties,
  fetchGame,
  updateDetails,
  updateScores,
} from "../utils/idb";
import {
  PlayerScore,
  clamp,
  createScoreTableArray,
} from "../utils/dataTransform";
import { ScoreModal } from "../components/game/ScoreModal";
import { IScore } from "../models/data";
import { DescriptionAccordion } from "../components/game/DescriptionAccordion";

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
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
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
      toast({
        title: "Scores updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      console.error("failed to update scores", updating.message);
    }
  };
  const publishDetails = async (updatedDetails: IDBProperties) => {
    const newDetails = { ...data, ...updatedDetails };
    const updating = await updateDetails(gameId, newDetails);
    if (updating.success) {
      router.invalidate();
      toast({
        title: "Details updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      console.error("failed to update details", updating.message);
    }
  };
  const handleFinish = async () => {
    const expectedScoresLength = data.playerList.length * data.holes;
    if (expectedScoresLength !== data.scores.length) {
      // do something with AlertDialog to confirm they want to save
      console.info("You have not entered all scores yet");
    }
    const updating = await updateDetails(gameId, { complete: true });
    if (updating.success) {
      router.invalidate();
      toast({
        title: "Game completed",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      console.error("failed to update details", updating.message);
    }
  };
  return (
    <Box maxW={{ md: "40rem" }} margin={{ md: "auto" }}>
      <DescriptionAccordion game={data} updateDetails={publishDetails} />
      <TableContainer>
        <Table>
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
          <Tfoot>
            <Tr>
              <Th>Hole</Th>
              {data.playerList.map((player) => {
                return <Th key={player}>{player}</Th>;
              })}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {!data.complete && <Button onClick={handleFinish}>Finish!</Button>}
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
