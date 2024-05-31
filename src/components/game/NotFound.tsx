import { Link } from "@tanstack/react-router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Link as ChakraLink,
  HStack,
  VStack,
} from "@chakra-ui/react";

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
          <ChakraLink to="/settings" textDecoration="underline" as={Link}>
            import their game data
          </ChakraLink>
        </AlertDescription>
      </VStack>
    </Alert>
  );
}
