import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Button,
  LinkBox,
  LinkOverlay,
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
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import useCheckForIdb from "../hooks/useCheckForIdb";
import { NewGame } from "../components/game/NewGame";
import { checkForIncompleteGame } from "../utils/idb";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  loader: async () => {
    return await checkForIncompleteGame();
  },
  component: Index,
});

/*
  TODOs:
  - search?
  ^ new page for recent/search games?
  - export data to JSON?
  - import data from JSON?
  - add par to hole column if exists, prob needs adding to "scores[]"
  - allow updating playerList when editing?
  - You have changed the playerList for the game, this will remove `player` scores
    are you sure you want to continue?
  __
  - update deps
*/

function Index() {
  // existing game should get existing state
  const idbAvailable = useCheckForIdb();
  const incompleteGames = Route.useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // if incomplete games are found, create a modal to ask user if they want to continue
  useEffect(() => {
    if (incompleteGames.length > 0) {
      onOpen();
    }
  }, []);
  return (
    <div>
      <span>{idbAvailable ? "IDB available" : "IDB not available"}</span>
      <NewGame />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent maxW="50rem">
            <ModalHeader textAlign="center">
              You have games still in progress!
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table size="sm">
                  <TableCaption>Games in progress</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Description</Th>
                      <Th>Players</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {incompleteGames.map((game) => {
                      const id = Object.keys(game)[0];
                      const { date, description, playerList, location } =
                        game[id];
                      return (
                        <LinkBox
                          as={Tr}
                          key={id}
                          _hover={{ backgroundColor: "var(--accent-colour)" }}
                        >
                          <Td>
                            <LinkOverlay to={`/game/${id}`} as={Link}>
                              {date}
                            </LinkOverlay>
                          </Td>
                          <Td>
                            <VStack textAlign="start">
                              <Text width="100%">{description}</Text>
                              {location && (
                                <Text
                                  as="sub"
                                  fontWeight={700}
                                  pb={1}
                                  width="100%"
                                >
                                  {location}
                                </Text>
                              )}
                            </VStack>
                          </Td>
                          <Td>
                            <Wrap spacing={4}>
                              {playerList.map((player, index) => {
                                return (
                                  <WrapItem key={`${player}-${index}`}>
                                    <Tag
                                      colorScheme="orange"
                                      borderRadius="full"
                                    >
                                      <TagLabel>{player}</TagLabel>
                                    </Tag>
                                  </WrapItem>
                                );
                              })}
                            </Wrap>
                          </Td>
                        </LinkBox>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Back to New Scorecard
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
}
