import { useState } from "react";
import {
  Link,
  createFileRoute,
  notFound,
  useRouter,
} from "@tanstack/react-router";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IDBProperties, getGame, setDetails, setScores } from "../../utils/idb";
import {
  PlayerScore,
  clamp,
  createScoreTableArray,
} from "../../utils/dataTransform";
import { ScoreModal } from "../../components/game/ScoreModal";
import { IScore } from "../../models/data";
import { DescriptionAccordion } from "../../components/game/DescriptionAccordion";
import { useTitle } from "../../hooks/useTitle";
import { GameNotFound } from "../../components/game/NotFound";

export const Route = createFileRoute("/_layout/game/$gameId")({
  loader: async ({ params }) => {
    const game = await getGame(params.gameId);
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
  useTitle(`Game ${data.description || gameId}`);
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
      arrayLike[record.hole - 1].__par = record.par;
    });
    return arrayLike;
  });
  const totalScores = scoreState.reduce((accumulator, hole) => {
    data.playerList.forEach((player) => {
      accumulator[player.name] =
        (accumulator[player.name] || 0) + (hole[player.name] || 0);
    });
    return accumulator;
  }, {});

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
      // if __par is added, it will come back in object .entries as a name
      Object.entries(record).forEach(([name, score]) => {
        if (name === "__par") return;
        if (score == null) return;
        newScores.push({
          par: record.__par ?? null,
          hole: hole,
          name: name,
          score: clamp(score, 0, data.maxShots),
        });
      });
    });

    const updating = await setScores(gameId, newScores);
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
    const updating = await setDetails(gameId, newDetails);
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
    const updating = await setDetails(gameId, { complete: true });
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
    <Box>
      <DescriptionAccordion game={data} updateDetails={publishDetails} />
      {!data.complete && (
        <Text fontSize="sm" fontWeight="medium" textAlign="center" p={2}>
          Click a cell to update scores
        </Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Hole</Th>
              {data.playerList.map((player) => {
                return (
                  <Th key={player.name} textAlign="center">
                    {player.name}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {scoreState.map((hole, idx) => {
              return (
                <Tr key={idx}>
                  <Td>
                    <Box display="flex" flexDirection="column">
                      <span>hole {idx + 1}</span>
                      {hole?.__par && hole.__par > 0 ? (
                        <Text
                          as="span"
                          fontSize="xs"
                          fontWeight="bold"
                          textTransform="uppercase"
                          color="gray.400"
                        >
                          par {hole.__par}
                        </Text>
                      ) : null}
                    </Box>
                  </Td>
                  {
                    // could do Object.keys() ES2015^ does keep insertion order
                    data.playerList.map((player) => {
                      return data.complete ? (
                        <Td key={player.name} textAlign="center">
                          {hole[player.name] || "-"}
                        </Td>
                      ) : (
                        <Td
                          key={player.name}
                          role="button"
                          onClick={() => openScoreModal(idx)}
                          textAlign="center"
                        >
                          {hole[player.name] || "-"}
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
              <Th>
                <VStack>
                  <span>Total</span>
                  <span>Score</span>
                </VStack>
              </Th>
              {data.playerList.map((player) => {
                return (
                  <Th key={player.name}>
                    <VStack>
                      <span>{player.name}</span>
                      <span>{totalScores[player.name]}</span>
                    </VStack>
                  </Th>
                );
              })}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Box pt={2} textAlign="center">
        {data.complete ? (
          <Button
            as={Link}
            to={`/chart/${gameId}`}
            width={{ base: "100%", md: "unset" }}
          >
            View as chart
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            width={{ base: "100%", md: "unset" }}
            px={12}
          >
            Finish!
          </Button>
        )}
      </Box>
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
