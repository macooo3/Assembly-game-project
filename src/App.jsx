import { useState } from "react";
import Header from "./components/Header";
import StatusPopup from "./components/StatusPopup";
import { languages } from "./assets/languages";
import NewGame from "./components/NewGameBtn";
import clsx from "clsx";
import getFarewellText from "./assets/utils";

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guess, setGuess] = useState([]);

  // Static values
  const alphabet = "abcdefghijklmopqrstuvwxyz";

  // Derivived Values
  const wrongGuessCount = guess.filter(
    (list) => !currentWord.includes(list)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guess.includes(letter));
  const isGameLoss = languages.length === wrongGuessCount;
  const isGameOver = isGameLoss || isGameWon;
  // const isGameWon = guess.filter((list) => currentWord.includes(list)).length ===
  //   currentWord.length;

  const languageElements = languages.map((lang, index) => {
    const langStyle = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    const checkGuesstoIndex = index < wrongGuessCount;

    const classStyle = clsx({
      "language-card": true,
      lost: checkGuesstoIndex,
    });

    return (
      <div key={lang.name} className={classStyle} style={langStyle}>
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

  const gameStatusColor = clsx("status-popup", {
    loss: isGameLoss,
    won: isGameWon,
    fareWell: !isGameOver && wrongGuessCount >= 1 && wrongGuessCount <= 8,
  });

  const insertEl = isGameOver
    ? isGameWon
      ? { header: "Congratulations", para: "You won the game!" }
      : { header: "Game Over", para: "You lost try again :(" }
    : wrongGuessCount >= 1 &&
      getFarewellText(languages[wrongGuessCount - 1].name);

  return (
    <main>
      <Header />
      <StatusPopup style={gameStatusColor} insertEl={insertEl} />
      <section className="languages">{languageElements}</section>
      <section className="word">{guessWord}</section>
      <section className="keyboard">{keyboardBtn}</section>
      <section className="new-btn">{isGameOver && <NewGame />}</section>
    </main>
  );
}

export default App;
