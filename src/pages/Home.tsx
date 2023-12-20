import { Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Link } from "../components/Link";
import { FormEvent, useReducer } from "react";

// Create an index route
export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

/*
  check for in progress game
  if found, ask, want to go to current game > redirect
  else home page, 
  new game
  last game
  search
*/

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "addPlayer":
      return { ...state, players: [...state.players, action.payload] };
    case "removePlayer":
      return {
        ...state,
        players: state.players.filter((p) => p !== action.payload),
      };
    case "currentPlayer":
      return { ...state, currentPlayer: action.payload };
    case "location":
      return { ...state, location: action.payload };
    case "date":
      return { ...state, date: action.payload };
    case "maxShots":
      return { ...state, maxShots: action.payload };
    case "par":
      return { ...state, par: action.payload };
    default:
      console.log("fall through");
      return { ...state };
  }
}
const initialState = {
  players: [],
  location: "",
  date: "",
  maxShots: 0,
  par: 0,
  currentPlayer: "",
};

interface FormState {
  players: string[];
  location: string;
  date: string;
  maxShots: number;
  par: number;
  currentPlayer: string;
}

type Action =
  | { type: "addPlayer"; payload: string }
  | { type: "removePlayer"; payload: string }
  | { type: "currentPlayer"; payload: string }
  | { type: "location"; payload: string }
  | { type: "date"; payload: string }
  | { type: "maxShots"; payload: number }
  | { type: "par"; payload: number };

function Home() {
  // new game
  // existing game should get existing state
  const [formState, dispatch] = useReducer(reducer, initialState);
  const updateInput = (e: FormEvent<HTMLInputElement>) => {
    dispatch({ type: e.currentTarget.name, payload: e.currentTarget.value });
  };
  const addPlayer = () => {
    if (formState.currentPlayer === "") return;
    // do some validation
    dispatch({ type: "addPlayer", payload: formState.currentPlayer });
    dispatch({ type: "currentPlayer", payload: "" });
  };
  return (
    <div>
      <h1>New Game</h1>
      <form>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={updateInput}
        />
        <input type="date" id="date" name="date" onChange={updateInput} />
        <label htmlFor="maxShots">Max Shots</label>
        <input
          type="number"
          id="maxShots"
          name="maxShots"
          onChange={updateInput}
        />
        <label htmlFor="par">Add par</label>
        <input type="number" id="par" name="par" onChange={updateInput} />
        <p>
          {formState.players.map((player, index) => {
            return <span key={player + index}>{player}</span>;
          })}
        </p>
        <label htmlFor="currentPlayer">Add players</label>
        <input
          type="text"
          id="currentPlayer"
          name="currentPlayer"
          onChange={updateInput}
        />
        <button onClick={addPlayer}>Add</button>
      </form>
      <Link to="/about" from="/">
        About
      </Link>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </div>
  );
}

/* function NumberInput({ label, id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="number" id={id} value={value} onChange={onChange} />
      <button>+</button>
      <button>-</button>
    </div>
  );
} */
/* component to add multiple players */
