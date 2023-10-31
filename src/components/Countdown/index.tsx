import React, { useState, useEffect } from "react";
import { StyledLetter } from "../../containers/GamePage/styles";
import { wordsSelector } from "../../redux/words/selector";
import { useSelector } from "react-redux";

const Countdown = ({
  startFrom,
  onCountdownStart,
  onCountdownEnd,
}: any) => {
  const { wordsData } = useSelector(wordsSelector);

  const [count, setCount] = useState(startFrom);

  useEffect(() => {
    if (wordsData) {
      setCount(startFrom);
    }
  }, [wordsData]);

  useEffect(() => {
    if (startFrom === 10) {
      onCountdownStart();
    }

    const countdown = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1);
      } else {
        setCount(0);
        onCountdownEnd();
      }
    }, 1000);

    return () => clearTimeout(countdown);
  }, [count, onCountdownStart, onCountdownEnd, startFrom]);

  return (
    <div>
      {startFrom === 3 ? <StyledLetter>{count}</StyledLetter> : <p>{count}</p>}
    </div>
  );
};

export default Countdown;
