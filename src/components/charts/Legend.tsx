import { Box, Button, Checkbox, Wrap } from "@chakra-ui/react";
import { Player } from "../game/model";

interface LegendProps {
  data: string[];
  showing: string[];
  onChange: (name: string) => void;
  toggleShowingAll: () => void;
  playerList: Player[];
}

export const Legend = ({
  data,
  showing,
  onChange,
  toggleShowingAll,
  playerList,
}: LegendProps) => {
  return (
    <Box fontWeight="bold" py={4} display="flex">
      <Button onClick={toggleShowingAll} colorScheme="orange" width="7rem">
        {showing.length > 0 ? "Uncheck" : "Check"}
      </Button>
      <Wrap
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        {data.map((player) => {
          const color = playerList.find((p) => p.name === player)?.color;
          return (
            <Checkbox
              key={player}
              value={player}
              isChecked={showing.includes(player)}
              onChange={() => onChange(player)}
              _checked={{
                "& .chakra-checkbox__control": {
                  bg: color,
                  borderColor: color,
                },
              }}
              borderColor={color}
              iconColor="white"
              p={2}
            >
              {player}
            </Checkbox>
          );
        })}
      </Wrap>
    </Box>
  );
};
