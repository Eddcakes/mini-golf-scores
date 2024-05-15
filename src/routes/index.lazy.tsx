import { createLazyFileRoute } from "@tanstack/react-router";
import useCheckForIdb from "../hooks/useCheckForIdb";
import useCheckForIncompleteGames from "../hooks/useCheckForIncompleteGames";
import { NewGame } from "../components/game/NewGame";
import "./index.css";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

/*
// refactor into
 - check for incomplete game
 - if found, ask user if they want to continue
 - if multiple found show modal/accordion with list
 - if selected, redirect to game
  - if not, continue with new game

  - new game page
  - edit (existing) game page

  - be able to complete games
  __ feature complete
  next feature
  - search?
  ^ new page for recent/search games?
  - export data to file?
  - import data from file?
  __
  - add styling library
  - update deps
*/

function Index() {
  // existing game should get existing state
  const idbAvailable = useCheckForIdb();
  const incompleteGames = useCheckForIncompleteGames();
  // if incomplete games are found, create a modal to ask user if they want to continue

  return (
    <div>
      <span>{idbAvailable ? "IDB available" : "IDB not available"}</span>
      <span>incomplete games in storage: {incompleteGames.length}</span>
      <NewGame />
    </div>
  );
}
