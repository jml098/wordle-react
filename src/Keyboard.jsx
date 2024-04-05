import "./Keyboard.css";
import colors from "./colors.js";

export default function Keyboard({
  onType,
  onErase,
  onSubmit,
  onRestart,
  letterSets,
}) {
  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  return (
    <div className="keyboard">
      {keyboardLayout.map((row, rowIndex) => {
        return (
          <div
            className="keyboard-row"
            key={rowIndex}
            style={{
              width:
                keyboardLayout[rowIndex].length * 10 +
                "%",
            }}
          >
            {row.map((letter, letterIndex) => {
              const backgroundColor =
                letterSets.correct.has(letter)
                  ? colors.green
                  : letterSets.possible.has(letter)
                    ? colors.yellow
                    : letterSets.wrong.has(letter)
                      ? colors.darkGray
                      : colors.gray;
              return (
                <div
                  className="keyboard-button-container"
                  key={letterIndex}
                  onClick={() => onType(letter)}
                >
                  <div
                    className="keyboard-button"
                    style={{ backgroundColor }}
                  >
                    {letter}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div
        className="keyboard-row"
        style={{
          width: "30%",
        }}
      >
        <div
          className="keyboard-button-container"
          onClick={onSubmit}
        >
          <div className="keyboard-button">OK</div>
        </div>
        <div
          className="keyboard-button-container"
          onClick={onRestart}
        >
          <div className="keyboard-button">{"⟲"}</div>
        </div>

        <div
          className="keyboard-button-container"
          onClick={onErase}
        >
          <div className="keyboard-button">{"⌫"}</div>
        </div>
      </div>
    </div>
  );
}
