import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
