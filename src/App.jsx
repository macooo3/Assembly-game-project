import { useState } from "react";
import Header from "./components/Header";
import StatusPopup from "./components/StatusPopup";
import { languages } from "./assets/languages";
import NewGame from "./components/NewGameBtn";
import clsx from "clsx";
import { getFarewellText, randomWord } from "./assets/utils";

function App() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => randomWord());
  const [guess, setGuess] = useState([]);

  console.log(currentWord);
  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Derivived Values
  const wrongGuessCount = guess.filter(
    (list) => !currentWord.includes(list)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every((letter) => guess.includes(letter));
  // const isGameWon = guess.filter((list) => currentWord.includes(list)).length ===
  //   currentWord.length;
  const isGameLoss = languages.length === wrongGuessCount;
  const isGameOver = isGameLoss || isGameWon;
  const lastGuess = guess.length > 0 && !currentWord.includes(guess.at(-1));

  console.log(lastGuess);

  // Display Func
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
        disabled={isGameOver}
        aria-disabled={guess.includes(letter)}
        aria-label={`Letter ${letter}`}
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
    fareWell: !isGameOver && lastGuess,
  });

  const insertEl = isGameOver
    ? isGameWon
      ? { header: "Congratulations", para: "You won the game!" }
      : { header: "Game Over", para: "You lost try again :(" }
    : lastGuess && getFarewellText(languages[wrongGuessCount - 1].name);

  const createNewGame = function () {
    setGuess([]);
    setCurrentWord(() => randomWord());
  };

  return (
    <main>
      <Header />
      <StatusPopup style={gameStatusColor} insertEl={insertEl} />
      <section className="languages">{languageElements}</section>
      <section className="word">{guessWord}</section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map((letter) => (guess.includes(letter) ? letter + "." : "blank."))
            .join(" ")}
        </p>
      </section>
      <section className="keyboard">{keyboardBtn}</section>
      <section className="new-btn">
        {isGameOver && <NewGame onClick={createNewGame} />}
      </section>
    </main>
  );
}

export default App;
