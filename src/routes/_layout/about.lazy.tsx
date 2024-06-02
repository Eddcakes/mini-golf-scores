import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Link } from "../../components/Link";
import { useTitle } from "../../hooks/useTitle";

export const Route = createLazyFileRoute("/_layout/about")({
  component: About,
});

function About() {
  useTitle("About");
  return (
    <div>
      <Alert status="info">
        <VStack>
          <HStack>
            <AlertIcon />
          </HStack>
          <AlertDescription>
            This site uses your browsers local storage, so your data will only
            be available on this browser unless you{" "}
            <Link to="/settings">export</Link> your games.
          </AlertDescription>
        </VStack>
      </Alert>
      <Box p={4}>
        Originally created to plray with d3 to chart out scores for a mini golf
        game in <Link to="/prague">prague.</Link>
      </Box>
    </div>
  );
}
