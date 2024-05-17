export function newGameReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "addPlayer":
      return { ...state, players: [...state.players, action.payload] };
    case "removePlayer":
      return {
        ...state,
        players: state.players.filter((p) => p !== action.payload),
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
      return { ...state, maxShots: parseInt(action.payload) };
    case "setHoles":
      return { ...state, holes: parseInt(action.payload) };
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
  holes: 0,
};

interface FormState {
  players: string[];
  description: string;
  location: string;
  date: string;
  maxShots: number;
  currentPlayer: string;
  holes: number;
}

type InputAction =
  | { type: "setCurrentPlayer"; payload: string }
  | { type: "setDescription"; payload: string }
  | { type: "setLocation"; payload: string }
  | { type: "setDate"; payload: string }
  | { type: "setMaxShots"; payload: string }
  | { type: "setHoles"; payload: string };

type Action =
  | { type: "addPlayer"; payload: string }
  | { type: "removePlayer"; payload: string }
  | { type: "resetForm"; payload: null }
  | InputAction;
