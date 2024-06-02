export function newGameReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "addPlayer":
      return { ...state, players: [...state.players, action.payload] };
    case "removePlayer":
      return {
        ...state,
        players: state.players.filter((p) => p.name !== action.payload),
      };
    case "setCurrentPlayer":
      return { ...state, currentPlayer: action.payload };
    case "setDescription":
      return { ...state, description: action.payload };
    case "setLocation":
      return { ...state, location: action.payload };
    case "setDate":
      return { ...state, date: action.payload };
    case "setMaxShots":
      return { ...state, maxShots: action.payload };
    case "setHoles":
      return { ...state, holes: action.payload };
    case "resetForm":
      return { ...initialNewGameState };
    default:
      console.log("fall through");
      return { ...state };
  }
}

export const initialNewGameState = {
  players: [],
  description: "",
  location: "",
  date: new Date().toISOString().split("T")[0],
  maxShots: 10,
  currentPlayer: "",
  holes: 9,
};

interface FormState {
  players: Player[];
  description: string;
  location: string;
  date: string;
  maxShots: number;
  currentPlayer: string;
  holes: number;
}

export interface Player {
  name: string;
  color: string;
}

type InputAction =
  | { type: "setCurrentPlayer"; payload: string }
  | { type: "setDescription"; payload: string }
  | { type: "setLocation"; payload: string }
  | { type: "setDate"; payload: string }
  | { type: "setMaxShots"; payload: number }
  | { type: "setHoles"; payload: number };

type Action =
  | { type: "addPlayer"; payload: Player }
  | { type: "removePlayer"; payload: string }
  | { type: "resetForm"; payload: null }
  | InputAction;
