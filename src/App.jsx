import "./App.css";
import { useState, useEffect } from "react";
import Wordle from "./../Wordle.js";
import Keyboard from "./Keyboard.jsx";
import colors from "./colors.js";

export default function App() {
  const [vocabulary, setVocabulary] = useState([]);
  const [game, setGame] = useState(null);

  const [settings, setSettings] = useState(true);

  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);

  const [gameState, setGameState] = useState(null);

  const [guess, setGuess] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/jml098/wordle-react/main/words.json",
    )
      .then((response) => response.text())
      .then((data) => {
        const vocabulary = JSON.parse(data);
        setVocabulary(vocabulary);
        const game = new Wordle(
          rows,
          cols,
          vocabulary,
        );
        setGame(game);
        setGameState(game.state);
      });
  }, []);

  function handleRestart() {
    const newGame = new Wordle(rows, cols, vocabulary);
    setGame(newGame);
    setGameState(newGame.state);
    setGuess("");
    setSettings(false)

    console.log(newGame.state)
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
      {settings ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px"
        }}>
          <label>
            Tentativi:
            <select value={rows} style={{
          fontSize: "30px",
            }} onChange={(e) => setRows(parseInt(e.target.value))}>
              {[2,3,4,5,6,7,8,9,10].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </label>

          <label>
            Lunghezza parola:
            <select value={cols} style={{fontSize: "30px"}} onChange={(e) => setCols(parseInt(e.target.value))}>
              {[3,4,5,6,7,8,9,10].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </label>
          <button style={{
          fontSize: "30px",
          }} onClick={() => handleRestart()}>Inizia</button>
        </div>
      ) : (
        <div>
          {gameState ? (
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
                    backgroundColor:
                      "rgba(0, 0, 0, 0.5)",
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
              <div className="grid">
                {gameState.guesses.map((g, y) => {
                  const style = {};
                  if (rows < cols)
                    style.width = "100%";
                  else style.height = "100%";
                  return (
                    <div
                      className="row"
                      style={style}
                      key={y}
                    >
                      {g.map((char, x) => {
                        const evaluation =
                            gameState.guessEvaluations[
                              y
                            ][x],
                          backgroundColor =
                            getCellColor(evaluation),
                          color = char
                            ? "white"
                            : "transparent",
                          transitionDelay =
                            0.075 * x + "s";

                        let className = "cell";
                        if (evaluation === 1)
                          className += " animate-grow";

                        let animationDelay =
                          0.075 * x + "s";

                        if (
                          gameState.guessIndex !== y
                        ) {
                          return (
                            <div
                              className={className}
                              key={x}
                              style={{
                                transitionDelay,
                                backgroundColor,
                                color,
                                animationDelay,
                                ...style,
                              }}
                            >
                              {char}
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="cell"
                              key={x}
                              style={{
                                transitionDelay,
                                backgroundColor:
                                  "darkgray",
                                color: "white",
                                ...style,
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
                  );
                })}
              </div>
              <Keyboard
                onType={handleType}
                onSubmit={submitGuess}
                onErase={handleErase}
                onRestart={handleRestart}
                onSettings={() => setSettings(true)}
                letterSets={{
                  correct: gameState.correctLetters,
                  possible: gameState.possibleLetters,
                  wrong: gameState.wrongLetters,
                }}
              />
            </main>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      )}
    </div>
  );
}
