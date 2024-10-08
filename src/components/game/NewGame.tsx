import { FormEvent, useReducer, useRef } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  TagCloseButton,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { initialNewGameState, newGameReducer } from "./model";
import { createRecord } from "../../utils/idb";
import { NumberInput } from "../NumberInput";
import { clamp } from "../../utils/dataTransform";
import { PlayerTag } from "../PlayerTag";

export function NewGame() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formState, dispatch] = useReducer(newGameReducer, initialNewGameState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const playerColorRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const addPlayer = () => {
    // do we want some validation on the player name?
    dispatch({
      type: "addPlayer",
      payload: {
        name: formState.currentPlayer.trim(),
        color: playerColorRef.current?.value ?? "#000000",
      },
    });
    // reset the color picker input
    if (playerColorRef.current) {
      playerColorRef.current.value = "#000000";
    }
    dispatch({ type: "setCurrentPlayer", payload: "" });
  };

  const submitPlayer = (
    event: FormEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    if (formState.currentPlayer === "") return;
    addPlayer();
  };

  const checkFields = () => {
    if (formState.players.length < 1) {
      toast({
        title: "No players added",
        description: "Please add at least one player to the game",
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (formState.holes < 1) {
      toast({
        title: "Invalid number of holes",
        description: "Please set at least 1",
        status: "error",
        isClosable: true,
      });
      return false;
    }
    if (formState.currentPlayer !== "") {
      // open alert dialog if we have a player in the input that we haven't added yet
      onOpen();
      return false;
    }
    return true;
  };

  const createGame = async (event: FormEvent) => {
    event.preventDefault();
    // do some validation
    const fieldsValid = checkFields();
    if (!fieldsValid) return;
    const data = {
      description: formState.description,
      location: formState.location,
      date: formState.date,
      maxShots: formState.maxShots,
      playerList: formState.players,
      holes: formState.holes,
    };

    const createdGame = await createRecord(data);
    if (createdGame.success) {
      resetForm();
      toast({
        title: "Game created",
        description: `Game created, redirecting to scores page...`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate({ from: "/", to: `/game/${createdGame.message}` });
    } else {
      toast({
        title: "Failed to create game",
        description: `${createdGame.message}`,
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleMissingPlayerDialog = () => {
    addPlayer();
    onClose();
  };

  const resetForm = () => {
    dispatch({ type: "resetForm", payload: null });
  };

  return (
    <VStack align="center">
      <Heading as="h1" size="lg">
        New Scorecard
      </Heading>
      <form onSubmit={createGame}>
        <VStack minW={{ md: "40rem" }} margin={{ md: "auto" }}>
          <FormControl>
            <FormLabel htmlFor="holes">Number of holes</FormLabel>
            <Center gap="4" pb={2}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="orange"
                onClick={() => dispatch({ type: "setHoles", payload: 9 })}
              >
                9
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="orange"
                onClick={() => dispatch({ type: "setHoles", payload: 18 })}
              >
                18
              </Button>
            </Center>
            <NumberInput
              name="holes"
              value={formState.holes}
              onChange={(evt) =>
                dispatch({
                  type: "setHoles",
                  payload: isNaN(parseInt(evt.currentTarget.value))
                    ? 0
                    : clamp(
                        parseInt(evt.currentTarget.value),
                        0,
                        Number.MAX_SAFE_INTEGER
                      ),
                })
              }
              onMinus={() =>
                dispatch({
                  type: "setHoles",
                  payload: clamp(
                    formState.holes - 1,
                    0,
                    Number.MAX_SAFE_INTEGER
                  ),
                })
              }
              onPlus={() =>
                dispatch({
                  type: "setHoles",
                  payload: formState.holes + 1,
                })
              }
            />
            <FormHelperText>
              How many holes does the course have?
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="maxShots">Max Shots</FormLabel>
            <NumberInput
              name="maxShots"
              value={formState.maxShots}
              onChange={(evt) =>
                dispatch({
                  type: "setMaxShots",
                  payload: parseInt(evt.currentTarget.value),
                })
              }
              onMinus={() =>
                dispatch({
                  type: "setMaxShots",
                  payload: clamp(
                    formState.maxShots - 1,
                    0,
                    Number.MAX_SAFE_INTEGER
                  ),
                })
              }
              onPlus={() =>
                dispatch({
                  type: "setMaxShots",
                  payload: formState.maxShots + 1,
                })
              }
            />
            <FormHelperText>
              To save the embarrassment, set a max number of shots per hole
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="currentPlayer">Add players</FormLabel>
            <InputGroup>
              <Input
                type="text"
                name="currentPlayer"
                value={formState.currentPlayer}
                onChange={(evt) =>
                  dispatch({
                    type: "setCurrentPlayer",
                    payload: evt.currentTarget.value,
                  })
                }
                onKeyDown={(evt) => {
                  if (evt.key === "Enter") {
                    submitPlayer(evt);
                  }
                }}
              />
              <InputRightAddon padding={0}>
                <Input
                  name="currentPlayerColor"
                  type="color"
                  borderRadius={0}
                  cursor="pointer"
                  px={2}
                  inlineSize="50px"
                  defaultValue="#000000"
                  ref={playerColorRef}
                />
                <Button
                  paddingX={6}
                  onClick={submitPlayer}
                  borderRadius="0 var(--chakra-radii-md) var(--chakra-radii-md) 0"
                >
                  Add
                </Button>
              </InputRightAddon>
            </InputGroup>
          </FormControl>
          <Wrap spacing={4}>
            {formState.players.map((player, index) => {
              return (
                <WrapItem key={`${player}-${index}`}>
                  <PlayerTag
                    player={player}
                    closeButton={
                      <TagCloseButton
                        onClick={() =>
                          dispatch({
                            type: "removePlayer",
                            payload: player.name,
                          })
                        }
                      />
                    }
                  />
                </WrapItem>
              );
            })}
          </Wrap>
          <Accordion allowToggle width="100%" pb={4}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Text
                    as="span"
                    flex="1"
                    fontWeight="var(--chakra-fontWeights-medium)"
                  >
                    More details
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px={0}>
                <VStack>
                  <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      onChange={(evt) =>
                        dispatch({
                          type: "setDescription",
                          payload: evt.currentTarget.value,
                        })
                      }
                      value={formState.description}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <Input
                      type="text"
                      id="location"
                      name="location"
                      onChange={(evt) =>
                        dispatch({
                          type: "setLocation",
                          payload: evt.currentTarget.value,
                        })
                      }
                      value={formState.location}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input
                      type="date"
                      id="date"
                      onChange={(evt) =>
                        dispatch({
                          type: "setDate",
                          payload: evt.currentTarget.value,
                        })
                      }
                      value={formState.date}
                    />
                  </FormControl>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button type="submit" colorScheme="orange" width="100%">
            Create Game
          </Button>
        </VStack>
      </form>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Player not added
            </AlertDialogHeader>

            <AlertDialogBody>
              Do you want to add '{formState.currentPlayer}' to the game?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleMissingPlayerDialog}
                ml={3}
              >
                Add {formState.currentPlayer}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
}
