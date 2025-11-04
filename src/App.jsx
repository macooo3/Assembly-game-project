import { useState } from "react";
import Header from "./components/Header";
import StatusPopup from "./components/StatusPopup";
import { languages } from "./assets/languages";
import NewGame from "./components/NewGameBtn";

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const alphabet = "abcdefghijklmopqrstuvwxyz";
  const [guess, setGuess] = useState([]);

  const languageElements = languages.map((lang) => (
    <div
      key={lang.name}
      className="language-card"
      style={{
        backgroundColor: lang.backgroundColor,
        color: lang.color,
      }}
    >
      {lang.name}
    </div>
  ));

  const guessWord = currentWord
    .toUpperCase()
    .split("")
    .map((word, index) => (
      <span key={index} className="word-card">
        {word}
      </span>
    ));

  const keyboardBtn = alphabet
    .toUpperCase()
    .split("")
    .map((letters, index) => (
      <button
        key={index}
        className="letterBtn"
        onClick={() => letterClick(letters)}
      >
        {letters}
      </button>
    ));

  const letterClick = function (e) {
    setGuess((prev) => {
      [prev, e];
    });
  };

  return (
    <main>
      <Header />
      <StatusPopup />
      <section className="languages">{languageElements}</section>
      <section className="word">{guessWord}</section>
      <section className="keyboard">{keyboardBtn}</section>
      <section className="btn">
        <NewGame />
      </section>
    </main>
  );
}

export default App;
