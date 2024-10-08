import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Button } from "@chakra-ui/react";
import { getGame } from "../../utils/idb";
import { GameNotFound } from "../../components/game/NotFound";
import { useTitle } from "../../hooks/useTitle";
import { ChartWrapper } from "../../components/charts/Wrapper";

export const Route = createFileRoute("/_charts/chart/$gameId")({
  loader: async ({ params }) => {
    const game = await getGame(params.gameId);
    if (!game) {
      throw notFound();
    }
    return game;
  },
  component: Chart,
  notFoundComponent: () => <GameNotFound />,
});

function Chart() {
  const { gameId } = Route.useParams();
  const data = Route.useLoaderData();
  useTitle(`Game ${data.description || gameId}`);
  return (
    <div>
      <ChartWrapper
        data={data.scores}
        shotLimitPerHole={data.maxShots}
        totalHoles={data.holes}
        playerList={data.playerList}
      />
      <Button as={Link} to={`/game/${gameId}`} colorScheme="orange">
        View scores
      </Button>
    </div>
  );
}
