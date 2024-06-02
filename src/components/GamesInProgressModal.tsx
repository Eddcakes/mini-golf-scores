import { Link } from "@tanstack/react-router";
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
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { IDBRecord } from "../utils/idb";
import { PlayerTag } from "./PlayerTag";

interface GamesInProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  incompleteGames: IDBRecord[];
}

export function GamesInProgressModal({
  isOpen,
  onClose,
  incompleteGames = [],
}: GamesInProgressModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent maxW="50rem">
          <ModalHeader textAlign="center">
            You have games still in progress!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table size="sm" variant="customStrip">
                <TableCaption>Games in progress</TableCaption>
                <Thead>
                  <Tr background="unset!important">
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
                        _hover={{ backgroundColor: "var(--primary-shadow)" }}
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
                                <WrapItem key={`${player.name}-${index}`}>
                                  <PlayerTag player={player} />
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
  );
}
