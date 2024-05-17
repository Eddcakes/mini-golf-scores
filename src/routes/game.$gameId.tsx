import { createFileRoute } from "@tanstack/react-router";
import { fetchGame } from "../utils/idb";

export const Route = createFileRoute("/game/$gameId")({
  loader: async ({ params }) => {
    return fetchGame(params.gameId);
  },
  component: Game,
});

function Game() {
  const { gameId } = Route.useParams();
  const data = Route.useLoaderData();
  console.log(data);
  return <div>Game: {gameId}</div>;
}
