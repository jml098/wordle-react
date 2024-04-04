import "./App.css";
import { useState, useEffect } from "react";
import Wordle from "./../Wordle.js";
import vocabulary from "./../words.json";

export default function App() {
  const [game, setGame] = useState(
    new Wordle(6, 6, vocabulary),
  );

  const [gameState, setGameState] = useState(
    game.state,
  );

  const [guess, setGuess] = useState("");

  function submitGuess() {
    setGameState(game.submitGuess(guess).state);
  }

  return (
    <main>
      <div className="board">
        {game.guesses.map((guess, y) => (
          <div className="row" key={y}>
            {guess.map((char, x) => {
              const evaluation =
                gameState.guessEvaluations[y][x];
              const backgroundColor =
                evaluation === 1
                  ? "green"
                  : evaluation === 2
                    ? "yellow"
                    : "gray";
              const color = "white";
              return (
                <div
                  className="cell"
                  key={x}
                  style={{ backgroundColor, color }}
                >
                  <div
                    className="cell-content"
                  >
                    {char}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={guess}
        onChange={(e) =>
          setGuess(e.target.value.toLowerCase())
        }
      ></input>
      <button onClick={() => submitGuess(guess)}>
        Guess
      </button>
    </main>
  );
}
