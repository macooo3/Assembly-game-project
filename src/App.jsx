import { useState } from "react";
import Header from "./components/Header";
import StatusPopup from "./components/StatusPopup";
import { languages } from "./assets/languages";
import NewGame from "./components/NewGameBtn";
import clsx from "clsx";

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guess, setGuess] = useState([]);

  // Static values
  const alphabet = "abcdefghijklmopqrstuvwxyz";

  // Derivived Values
  const wronGuessCount = guess.filter(
    (list) => !currentWord.includes(list)
  ).length;

  console.log(wronGuessCount);

  const languageElements = languages.map((lang) => {
    const langStyle = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <div key={lang.name} className="language-card" style={langStyle}>
        {lang.name}
      </div>
    );
  });

  const guessWord = currentWord.split("").map((word, index) => {
    const displayWord = guess.includes(word);

    return (
      <span key={index} className="word-card">
        {displayWord && word.toUpperCase()}
      </span>
    );
  });

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
