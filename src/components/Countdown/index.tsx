import React, { useState, useEffect } from "react";
import { StyledLetter } from "../../containers/GamePage/styles";
const Countdown = ({ startFrom, onCountdownEnd }: any) => {
  const [count, setCount] = useState(startFrom);

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (count > 1) {
        setCount(count - 1);
      } else {
        setCount(0);
        onCountdownEnd();
      }
    }, 1000);

    return () => clearTimeout(countdown);
  }, [count, onCountdownEnd]);

  return (
    <div>
      {startFrom === 3 ? <StyledLetter>{count}</StyledLetter> : <p>{count}</p>}
    </div>
  );
};

export default Countdown;
