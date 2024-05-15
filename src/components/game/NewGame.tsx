import { FormEvent, useReducer } from "react";
import { initialNewGameState, newGameReducer } from "./model";
import { createRecord } from "../../utils/idb";

export function NewGame() {
  const [formState, dispatch] = useReducer(newGameReducer, initialNewGameState);
  const addPlayer = (
    event: FormEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    if (formState.currentPlayer === "") return;
    // do some validation
    dispatch({ type: "addPlayer", payload: formState.currentPlayer });
    dispatch({ type: "setCurrentPlayer", payload: "" });
  };

  const createGame = async (event: FormEvent) => {
    event.preventDefault();
    // do some validation
    if (formState.name === "") return;
    const data = {
      name: formState.name,
      description: formState.description,
      location: formState.location,
      date: formState.date,
      maxShots: formState.maxShots,
      playerList: formState.players,
    };

    const createdGame = await createRecord(data);
    if (createdGame.success) {
      console.log("Game created:", createdGame.message);
      resetForm();
      // prob redirect not reset form
    } else {
      console.log("Failed to create game", createdGame.message);
    }
    // save to local storage
  };

  const resetForm = () => {
    dispatch({ type: "resetForm", payload: null });
  };

  return (
    <div>
      <h1>New Game</h1>
      <form onSubmit={createGame}>
        <label htmlFor="name">Event name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(evt) =>
            dispatch({ type: "setName", payload: evt.currentTarget.value })
          }
          value={formState.name}
        />
        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(evt) =>
            dispatch({
              type: "setDescription",
              payload: evt.currentTarget.value,
            })
          }
          value={formState.description}
        />
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={(evt) =>
            dispatch({ type: "setLocation", payload: evt.currentTarget.value })
          }
          value={formState.location}
        />
        <input
          type="date"
          id="date"
          name="date"
          onChange={(evt) =>
            dispatch({ type: "setDate", payload: evt.currentTarget.value })
          }
          value={formState.date}
        />
        <label htmlFor="maxShots">Max Shots</label>
        <span className="helperText">
          We will stop counting after we hit this
        </span>
        <input
          type="number"
          id="maxShots"
          name="maxShots"
          value={formState.maxShots}
          onChange={(evt) =>
            dispatch({ type: "setMaxShots", payload: evt.currentTarget.value })
          }
        />
        <label htmlFor="holes">Holes</label>
        <div className="row">
          <button
            type="button"
            onClick={() => dispatch({ type: "setHoles", payload: "9" })}
          >
            9
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "setHoles", payload: "18" })}
          >
            18
          </button>
        </div>
        <input
          type="number"
          id="holes"
          name="holes"
          value={formState.holes}
          onChange={(evt) =>
            dispatch({ type: "setHoles", payload: evt.currentTarget.value })
          }
        />
        {formState.players.map((player, index) => {
          return (
            <div className="row" key={player + index}>
              <span>{player}</span>
              <button
                onClick={() =>
                  dispatch({ type: "removePlayer", payload: player })
                }
              >
                X
              </button>
            </div>
          );
        })}
        <fieldset>
          <label htmlFor="currentPlayer">Add players</label>
          <input
            type="text"
            id="currentPlayer"
            name="currentPlayer"
            value={formState.currentPlayer}
            onChange={(evt) =>
              dispatch({
                type: "setCurrentPlayer",
                payload: evt.currentTarget.value,
              })
            }
            onKeyDown={(evt) => {
              if (evt.key === "Enter") {
                addPlayer(evt);
              }
            }}
          />
          <button type="button" onClick={addPlayer}>
            Add
          </button>
        </fieldset>
        <button type="submit">Create Game</button>
      </form>
      <pre>{JSON.stringify(formState, null, 2)}</pre>
    </div>
  );
}
