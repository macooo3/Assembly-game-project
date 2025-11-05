import { useState } from "react";
import Header from "./components/Header";
import StatusPopup from "./components/StatusPopup";
import { languages } from "./assets/languages";
import NewGame from "./components/NewGameBtn";
import clsx from "clsx";

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

  const keyboardBtn = alphabet.split("").map((letter, index) => {
    const isGuessed = guess.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const classStyle = clsx({
      rightLetter: isCorrect,
      wrongLetter: isWrong,
    });

    return (
      <button
        key={index}
        onClick={() => letterClick(letter)}
        className={classStyle}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  /* one way of checking if guess exists*/
  // const letterClick = function (letters) {
  //   setGuess((prevGuess) => {
  //     const letterSet = new Set(prevGuess);
  //     letterSet.add(letters);
  //     return Array.from(letterSet);
  //   });
  // };

  const letterClick = function (letter) {
    setGuess((prevGuess) =>
      prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter]
    );
  };

  console.log(guess);
  return (
    <main>
      <Header />
      <StatusPopup />
      <section className="languages">{languageElements}</section>
      <section className="word">{guessWord}</section>
      <section className="keyboard">{keyboardBtn}</section>
      <section className="new-btn">
        <NewGame />
      </section>
    </main>
  );
}

export default App;
