import { Box, Button, Checkbox } from "@chakra-ui/react";
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
    <Box
      display="flex"
      fontWeight="bold"
      justifyContent="space-around"
      py={4}
      alignItems="center"
      flexWrap="wrap"
    >
      <Button onClick={toggleShowingAll} colorScheme="orange">
        {showing.length > 0 ? "Uncheck all" : "Check all"}
      </Button>

      {data.map((player) => {
        const color = playerList.find((p) => p.name === player)?.color;
        return (
          <div key={player}>
            <Checkbox
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
            >
              {player}
            </Checkbox>
          </div>
        );
      })}
    </Box>
  );
};
