import { createFileRoute } from "@tanstack/react-router";
import { useDisclosure } from "@chakra-ui/react";
import { NewGame } from "../../components/game/NewGame";
import { getIncompleteGames } from "../../utils/idb";
import { useEffect } from "react";
import { GamesInProgressModal } from "../../components/GamesInProgressModal";
import { useTitle } from "../../hooks/useTitle";

export const Route = createFileRoute("/_layout/")({
  loader: async () => {
    return await getIncompleteGames();
  },
  component: Index,
});

function Index() {
  useTitle("New Scorecard");
  const incompleteGames = Route.useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // if incomplete games are found, create a modal to ask user if they want to continue
  useEffect(() => {
    if (incompleteGames.length > 0) {
      onOpen();
    }
  }, [onOpen, incompleteGames]);
  return (
    <div>
      <NewGame />
      <GamesInProgressModal
        isOpen={isOpen}
        onClose={onClose}
        incompleteGames={incompleteGames}
      />
    </div>
  );
}
