import App from "./App";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("");

  return (
    <div>
      {lang ? (
        <App lang={lang} />
      ) : (
        <div>
          <h1>Language</h1>
          <button onClick={() => setLang("it")}>
            Italiano
          </button>
          <button onClick={() => setLang("fr")}>
            Français
          </button>
        </div>
      )}
    </div>
  );
}
