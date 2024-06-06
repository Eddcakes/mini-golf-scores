import { Tag, TagLabel } from "@chakra-ui/react";
import { Player } from "./game/model";
import { ColorChipIcon } from "./icons";

interface PlayerTagProps {
  player: Player;
  closeButton?: React.ReactNode;
}

export function PlayerTag({ player, closeButton }: PlayerTagProps) {
  return (
    <Tag colorScheme="orange" borderRadius="full">
      <ColorChipIcon color={player.color} />
      <TagLabel paddingStart={1}>{player.name}</TagLabel>
      {closeButton}
    </Tag>
  );
}
