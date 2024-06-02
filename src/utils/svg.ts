import { Player } from "../components/game/model";

export const createColorDictionary = (playerList: Player[]) =>
  Object.fromEntries(playerList.map((person) => [[person.name], person.color]));
