import { useEffect, useState } from "react";
import { IDBRecord, getIncompleteGames } from "../utils/idb";

const useCheckForIncompleteGames = () => {
  const [incompleteGames, setIncompleteGames] = useState<IDBRecord[]>([]);
  useEffect(() => {
    const fetchIncompleteGames = async () => {
      const games = await getIncompleteGames();
      setIncompleteGames(games);
    };
    fetchIncompleteGames();
  }, []);
  return incompleteGames;
};

export default useCheckForIncompleteGames;
