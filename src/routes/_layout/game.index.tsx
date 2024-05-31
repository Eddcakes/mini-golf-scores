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
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";
import { getAllGames, IDBRecord } from "../../utils/idb";
import { useTitle } from "../../hooks/useTitle";
import { RadioCard } from "../../components/RadioButton";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Route = createFileRoute("/_layout/game/")({
  loader: async () => {
    const games: IDBRecord[] = await getAllGames();
    return games;
  },
  component: GameList,
});

const gameOrChart = [
  { value: "game", label: "Scores" },
  { value: "chart", label: "Chart" },
];

function GameList() {
  useTitle("All games");
  const games = Route.useLoaderData();
  // save selected value to cookie/local storage?
  const { value, getRootProps, getRadioProps } = useRadioGroup({
    name: "gameOrChart",
    defaultValue: gameOrChart[0].value,
  });
  return (
    <VStack>
      <HStack {...getRootProps()}>
        {gameOrChart.map((option) => {
          return (
            <RadioCard
              key={option.value}
              {...getRadioProps({ value: option.value })}
            >
              {option.label}
            </RadioCard>
          );
        })}
      </HStack>
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
                    <LinkOverlay to={`/${value}/${id}`} as={Link}>
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
