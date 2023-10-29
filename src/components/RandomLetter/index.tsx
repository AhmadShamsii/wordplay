import { useEffect, useState } from "react";
import { StyledLetter } from "../../containers/GamePage/styles";
import { setRandomLetter } from "../../redux/words/slice";
import { useDispatch } from "react-redux";

const RandomAlphabetExcludingX = ({ generateRandomAlphabet }: any) => {
  const dispatch = useDispatch();
  const [letter, setLetter] = useState<string | null>(null);

  useEffect(() => {
    if (generateRandomAlphabet) {
      // Call the generateRandomAlphabet logic here
      const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      const filteredAlphabets = alphabets.filter((letter) => letter !== "X");
      const randomIndex = Math.floor(Math.random() * filteredAlphabets.length);
      setLetter(filteredAlphabets[randomIndex]);
    }
    dispatch(setRandomLetter(letter));
  }, [generateRandomAlphabet]);

  return <div>{letter !== null && <StyledLetter>{letter}</StyledLetter>}</div>;
};

export default RandomAlphabetExcludingX;
