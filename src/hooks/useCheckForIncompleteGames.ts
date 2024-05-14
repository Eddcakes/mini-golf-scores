import { useEffect, useState } from "react";
import { IDBRecord, checkForIncompleteGame } from "../utils/idb";

const useCheckForIncompleteGames = () => {
  const [incompleteGames, setIncompleteGames] = useState<IDBRecord[]>([]);
  useEffect(() => {
    const fetchIncompleteGames = async () => {
      const games = await checkForIncompleteGame();
      setIncompleteGames(games);
    };
    fetchIncompleteGames();
  }, []);
  return incompleteGames;
};

export default useCheckForIncompleteGames;
