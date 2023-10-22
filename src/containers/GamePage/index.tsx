import { Avatar, Input, Space, message } from "antd";
import { StyledTitle } from "../HomePage/styles";
import {
  StyledSpace,
  StyledSpace2,
  StyledScore,
  StyledButton,
  StyledCard,
} from "./styles";
import Countdown from "../../components/Countdown";
import { useState } from "react";
import RandomAlphabet from "../../components/RandomLetter";
import { fetchWordsRequest } from "../../redux/words/slice";
import { useDispatch, useSelector } from "react-redux";
import { wordsSelector } from "../../redux/words/selector";
const GamePage = () => {
  const dispatch = useDispatch();
  const { wordsData } = useSelector(wordsSelector);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showCountdownLimit, setShowCountdownLimit] = useState(false);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isTimesUp, setIsTimesUp] = useState(false);

  console.log(wordsData, "wordsdata");

  // const handleWrongWord = () => {};
  // const handleTimesUp = () => {};
  // const handleCorrectWord = () => {};

  // if (isTimesUp && !wordsData) {
  //   handleTimesUp();
  // }
  // if (!isTimesUp && !wordsData) {
  //   handleWrongWord();
  // }

  // if (!isTimesUp && wordsData) {
  //   handleCorrectWord();
  // }

  const handleGameStart = () => {
    setShowLetter(true);
    setShowCountdown(false);
    setShowStartBtn(false);

    setShowCountdownLimit(true);
    setIsInputDisabled(false);
  };
  const handleCountdown = () => {
    setShowCountdown(true);
    setShowStartBtn(false);
  };

  const handleInput = (e: any) => {
    console.log(e.target.value);
    dispatch(fetchWordsRequest(e.target.value));
  };

  const handleTimeUp = () => {
    console.log("timeup");
    setIsTimesUp(true);
  };

  return (
    <StyledSpace>
      <Space>
        <StyledTitle>Wordplay</StyledTitle>
        <Avatar
          style={{
            backgroundColor: "#1890ff",
            verticalAlign: "middle",
          }}
          size="large"
        >
          AS
        </Avatar>
      </Space>
      {showCountdown && (
        <Countdown startFrom={3} onCountdownEnd={handleGameStart} />
      )}
      {showLetter && <RandomAlphabet generateRandomAlphabet={showLetter} />}
      {showStartBtn && (
        <StyledButton onClick={handleCountdown} type="primary">
          Start
        </StyledButton>
      )}
      <StyledSpace2>
        <div>
          <StyledScore>Words: 7</StyledScore>
          <StyledScore>Points: 37</StyledScore>
        </div>
        <div>
          <StyledScore>
            Time:
            {showCountdownLimit && (
              <Countdown startFrom={5} onCountdownEnd={handleTimeUp} />
            )}
          </StyledScore>
        </div>
      </StyledSpace2>
      <br />
      <Input
        disabled={isInputDisabled}
        size="large"
        placeholder="Enter the word!"
        onPressEnter={handleInput}
      />
      {/* minor change */}
      <StyledCard bordered={false}>minor change</StyledCard>
      <div> change</div>
    </StyledSpace>
  );
};

export default GamePage;
