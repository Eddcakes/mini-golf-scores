import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Link } from "../Link";

export function GameNotFound() {
  return (
    <Alert status="info">
      <VStack>
        <HStack>
          <AlertIcon />
          <AlertTitle>Hey, we cannot find that game.</AlertTitle>
        </HStack>
        <AlertDescription>
          Remember, game data is stored locally in your browser, so if you are
          trying a link from another person or another device you will need to{" "}
          <Link to="/settings">import their game data</Link>
        </AlertDescription>
      </VStack>
    </Alert>
  );
}

export function NoGamesFound() {
  return (
    <Alert status="info">
      <VStack>
        <HStack>
          <AlertIcon />
          <AlertTitle>No Games found</AlertTitle>
        </HStack>
        <AlertDescription>
          <Text>
            This site uses your browsers local storage, so your data will only
            be available on this browser unless you{" "}
            <Link to="/settings">export</Link> your games.
          </Text>
          <Text pt={2}>
            Or get started by creating a <Link to="/game/">new game</Link>.
          </Text>
        </AlertDescription>
      </VStack>
    </Alert>
  );
}
