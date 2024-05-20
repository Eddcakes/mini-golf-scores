import { useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Link as ChakraLink,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
import { clamp, createScoreTableArray } from "../utils/dataTransform";

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

interface ModalForState {
  hole: number | null;
  player: string | null;
}

function Game() {
  // const { gameId } = Route.useParams();
  // prob need gameId for when we set the data back to idb so keep it around for now
  const data = Route.useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalFor, setModalFor] = useState<ModalForState>({
    hole: null,
    player: null,
  });
  const [scoreState, setScoreState] = useState(() => {
    // format the data so we can render in a table much easier
    const arrayLike = createScoreTableArray(data.holes, data.playerList);
    // set scores from idb data
    data.scores.forEach((record) => {
      arrayLike[record.hole - 1][record.name] = record.score;
    });
    return arrayLike;
  });
  const openScoreForHole = (hole: number, player?: string) => {
    setModalFor({ hole: hole, player: player ?? null });
    onOpen();
  };
  const resetModalFor = () => {
    submitScoresForHole();
    setModalFor({ hole: null, player: null });
    onClose();
    // should this also submit the scores
    // submitScoresForHole();
    // can it even pass an event? since we are preventing default in form
  };

  const submitScoresForHole = () => {
    // event.preventDefault();
    // kinda need the prevent default so we can do validation
    // update the scoreState with the new scores
    // then update the idb with the new scores
    // then close the modal
    // then reset the modalFor state
    console.log("submitting scores for hole");
  };
  // helper function to early return if hole is null
  const selectScoreState = (hole: number | null, player: string) => {
    if (!hole) return 0;
    return scoreState[hole - 1][player] ?? 0;
  };

  const handleAdd1Score = (hole: number, player: string) => {
    const tempScore = [...scoreState];
    const scoreValue = tempScore[hole][player] ?? 0;
    // clamp score on max shots
    tempScore[hole][player] = clamp(scoreValue + 1, 0, data.maxShots); // scoreValue < data.maxShots ? scoreValue + 1 : 10;
    setScoreState(tempScore);
  };
  const handleMinus1Score = (hole: number, player: string) => {
    const tempScore = [...scoreState];
    const scoreValue = tempScore[hole][player] ?? 0;
    // clamp score on 0
    tempScore[hole][player] = clamp(scoreValue - 1, 0, data.maxShots);
    setScoreState(tempScore);
  };
  // setScoreState will be used by fotempScorerm elements from a modal to update the scoreState
  // after a debounce timer we will update the idb with the new scoreState

  // console.log(scoreState);
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
                          onClick={() => openScoreForHole(idx + 1, player)}
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
      <Modal isOpen={isOpen} onClose={resetModalFor}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Hole: {modalFor.hole} Update Scores</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={submitScoresForHole}>
                <VStack>
                  {modalFor.hole != null ? (
                    Object.keys(scoreState[modalFor.hole - 1]).map((player) => {
                      return (
                        <FormControl
                          key={player}
                          isInvalid={
                            selectScoreState(modalFor.hole, player) >
                              data.maxShots ||
                            selectScoreState(modalFor.hole, player) < 0
                          }
                        >
                          <FormLabel>{player}</FormLabel>
                          <Input
                            type="number"
                            value={selectScoreState(modalFor.hole, player)}
                            onChange={(evt) => {
                              setScoreState((prev) => {
                                const newState = [...prev];
                                modalFor.hole != null
                                  ? (newState[modalFor!.hole - 1][player] =
                                      newState[modalFor!.hole - 1][player] =
                                        parseInt(evt.target.value))
                                  : // tried clamping here but not great UX, so just show error message
                                    null;
                                return newState;
                              });
                            }}
                          />
                          <FormErrorMessage>
                            {selectScoreState(modalFor.hole, player) >
                              data.maxShots &&
                              `Score is above the maximum shots value: ${data.maxShots}, when saving this score will be set to ${data.maxShots}`}
                            {selectScoreState(modalFor.hole, player) < 0 &&
                              `Score is below 0, when saving this score will be set to 0`}
                          </FormErrorMessage>
                          <ButtonGroup>
                            <Button
                              onClick={() =>
                                handleMinus1Score(modalFor.hole! - 1, player)
                              }
                            >
                              -
                            </Button>
                            <Button
                              onClick={() =>
                                handleAdd1Score(modalFor.hole! - 1, player)
                              }
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </FormControl>
                      );
                    })
                  ) : (
                    <div>not found hole</div>
                  )}
                  <FormControl>
                    <FormLabel htmlFor="score">Score</FormLabel>
                  </FormControl>
                </VStack>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={resetModalFor}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
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
