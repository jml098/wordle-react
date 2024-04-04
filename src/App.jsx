import "./App.css";
import { useState, useEffect } from "react";
import Wordle from "./../Wordle.js";
import Keyboard from "./Keyboard.jsx";
import colors from "./colors.js";

export default function App() {
  const [vocabulary, setVocabulary] = useState([]);
  const [game, setGame] = useState(null);

  const [gameState, setGameState] = useState(null);

  const [guess, setGuess] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/jml098/wordle-react/main/words.json"
    )
      .then((response) => response.text())
      .then((data) => {
        setVocabulary(JSON.parse(data));
        const game = new Wordle(6,6,vocabulary);
        setGame(game);
        setGameState(game.state);
      });
  }, []);

  function handleRestart() {
    setGame(new Wordle(6, 6, vocabulary));
    setGameState(game.state);
    setGuess("");
  }

  function submitGuess() {
    setGameState(game.submitGuess(guess).state);
    setGuess("");
  }

  function getCellColor(evaluation) {
    return evaluation === 1
      ? colors.green
      : evaluation === 2
        ? colors.yellow
        : evaluation === 0
          ? colors.darkGray
          : colors.gray;
  }

  function handleType(letter) {
    if (guess.length < game.wordLength)
      setGuess(guess + letter);
  }

  function handleErase() {
    if (guess.length > 0) setGuess(guess.slice(0, -1));
  }

  return (
    <div>
      {gameState && (
        <main>
          {gameState.gameOver && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 5,
                position: "absolute",
                width: "100%",
                height: "100%",
                fontFamily: "Roboto, sans-serif",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <h1
                style={{
                  color: gameState.gameWon
                    ? colors.green
                    : colors.red,
                }}
              >
                {gameState.gameWon
                  ? "You won!"
                  : "You lost!"}
              </h1>
              <div
                onClick={handleRestart}
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  backgroundColor: colors.gray,
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  padding: "10px",
                }}
              >
                Restart
              </div>
            </div>
          )}
          <div className="board">
            {gameState.guesses.map((g, y) => (
              <div className="row" key={y}>
                {g.map((char, x) => {
                  const evaluation =
                      gameState.guessEvaluations[y][x],
                    backgroundColor =
                      getCellColor(evaluation),
                    color = char
                      ? "white"
                      : "transparent",
                    transitionDelay = 0.075 * x + "s";

                  if (gameState.guessIndex !== y) {
                    return (
                      <div
                        className="cell"
                        key={x}
                        style={{
                          transitionDelay,
                          backgroundColor,
                          color,
                        }}
                      >
                        <div className="cell-content">
                          {char}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="cell"
                        key={x}
                        style={{
                          transitionDelay,
                          backgroundColor: "darkgray",
                          color: "white",
                        }}
                      >
                        <div className="cell-content">
                          {guess[x] || ""}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
          <Keyboard
            onType={handleType}
            onSubmit={submitGuess}
            onErase={handleErase}
            onRestart={handleRestart}
            letterSets={{
              correct: gameState.correctLetters,
              possible: gameState.possibleLetters,
              wrong: gameState.wrongLetters,
            }}
          />
        </main>
      )}
    </div>
  );
}
