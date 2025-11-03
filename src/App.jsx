import { useState } from "react";
import Header from "./components/Header";
import StatusPopup from "./components/StatusPopup";
import { languages } from "./assets/languages";

function App() {
  const [currentWord, setCurrentWord] = useState("react");

  const alphabet = "abcdefghijklmopqrstuvwxyz";

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
      <button key={index} className="letterBtn">
        {letters}
      </button>
    ));

  return (
    <main>
      <Header />
      <StatusPopup />
      <section className="languages">{languageElements}</section>
      <section className="word">{guessWord}</section>
      <section className="keyboard">{keyboardBtn}</section>
    </main>
  );
}

export default App;
