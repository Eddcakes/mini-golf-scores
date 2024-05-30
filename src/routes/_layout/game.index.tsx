import { createFileRoute, Link } from "@tanstack/react-router";
import {
  VStack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  LinkBox,
  Td,
  LinkOverlay,
  Text,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { getAllGames, IDBRecord } from "../../utils/idb";
import { useTitle } from "../../hooks/useTitle";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Route = createFileRoute("/_layout/game/")({
  loader: async () => {
    const games: IDBRecord[] = await getAllGames();
    return games;
  },
  component: GameList,
});

function GameList() {
  useTitle("All games");
  const games = Route.useLoaderData();
  return (
    <VStack>
      <TableContainer>
        <Table size="sm" variant="customStrip">
          <TableCaption>All games</TableCaption>
          <Thead>
            <Tr background="unset!important">
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Players</Th>
            </Tr>
          </Thead>
          <Tbody>
            {games.map((game: IDBRecord) => {
              const id = Object.keys(game)[0];
              const { date, description, playerList, location } = game[id];
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
                        <Text as="sub" fontWeight={700} pb={1} width="100%">
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
                            <Tag colorScheme="orange" borderRadius="full">
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
    </VStack>
  );
}
