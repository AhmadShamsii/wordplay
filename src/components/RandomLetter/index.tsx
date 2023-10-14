import React, { useEffect, useState } from "react";
import { StyledLetter } from "../../containers/GamePage/styles";

const RandomAlphabetExcludingX = ({ generateRandomAlphabet }: any) => {
  const [randomLetter, setRandomLetter] = useState<string | null>(null);

  useEffect(() => {
    if (generateRandomAlphabet) {
      // Call the generateRandomAlphabet logic here
      const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      const filteredAlphabets = alphabets.filter((letter) => letter !== "X");
      const randomIndex = Math.floor(Math.random() * filteredAlphabets.length);
      setRandomLetter(filteredAlphabets[randomIndex]);
    }
  }, [generateRandomAlphabet]);

  return (
    <div>
      {randomLetter !== null && <StyledLetter>{randomLetter}</StyledLetter>}
    </div>
  );
};

export default RandomAlphabetExcludingX;
