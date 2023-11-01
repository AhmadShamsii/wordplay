import { Avatar, Form, Input, Space, message } from "antd";
import { StyledTitle } from "../HomePage/styles";
import {
  StyledSpace,
  StyledSpace2,
  StyledScore,
  StyledButton,
  StyledMessage,
  StyledLetter,
} from "./styles";
import Countdown from "../../components/Countdown";
import { useEffect, useState } from "react";
import {
  fetchWordsRequest,
  setTimeStart,
  setTimeEnd,
  settingRandomLetter,
} from "../../redux/words/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  wordsSelector,
  letterSelector,
  scoreSelector,
  timeSelector,
} from "../../redux/words/selector";

const GamePage = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { wordsData, error } = useSelector(wordsSelector);
  const { points, totalWords } = useSelector(scoreSelector);
  const { isTimeStart, isTimeEnd } = useSelector(timeSelector);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showCountdownLimit, setShowCountdownLimit] = useState(false);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [randomLetter, setRandomLetter] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const [playAgainBtn, setPlayAgainButton] = useState(false);

  const getRandomAlphabet = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randLetter = alphabet[randomIndex];
    setRandomLetter(randLetter);
  };

  console.log(wordsData);

  useEffect(() => {
    if (wordsData) {
      getRandomAlphabet();
      dispatch(settingRandomLetter(randomLetter));
    }
  }, [wordsData, dispatch]);

  const handleGameStart = () => {
    getRandomAlphabet();
    setShowCountdown(false);
    setShowStartBtn(false);

    setShowCountdownLimit(true);
    setIsInputDisabled(false);
  };
  const handleCountdown = () => {
    setShowCountdown(true);
    setShowStartBtn(false);
  };

  let gameOverMsg = "";
  const handleGameOver = () => {
    gameOverMsg = "Times Up! Game Over!!";
    setPlayAgainButton(true);
    setRandomLetter("");
  };

  const handleInput = (e: any) => {
    const payload: any = {
      word: e.target.value.toLowerCase(),
      letter: randomLetter.toLowerCase(),
      isTimeStart: isTimeStart,
      isTimeEnd: isTimeEnd,
    };
    if (!isTimeEnd) {
      dispatch(fetchWordsRequest(payload));
    } else if (isTimeEnd) {
      handleGameOver();
    }
    form.resetFields();
  };

  const handleTimeUp = () => {
    dispatch(setTimeEnd(true));
  };

  const handleCountdownStart = () => {
    dispatch(setTimeStart(true));
  };

  useEffect(() => {
    if (isTimeEnd) {
      handleGameOver();
    }
  }, [isTimeEnd]);

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
      <StyledLetter>{randomLetter}</StyledLetter>
      {showStartBtn && (
        <StyledButton onClick={handleCountdown} type="primary">
          Start
        </StyledButton>
      )}
      {playAgainBtn && (
        <StyledButton onClick={handleCountdown} type="primary">
          Play Again
        </StyledButton>
      )}
      <StyledSpace2>
        <div>
          <StyledScore>Words: {totalWords || 0}</StyledScore>
          <StyledScore>Points: {points || 0}</StyledScore>
        </div>
        <div>
          <StyledScore>
            Time:
            {showCountdownLimit && (
              <Countdown
                startFrom={10}
                onCountdownStart={handleCountdownStart}
                onCountdownEnd={handleTimeUp}
              />
            )}
          </StyledScore>
        </div>
      </StyledSpace2>
      <br />
      <Form form={form}>
        <Form.Item name="input">
          <Input
            autoFocus
            disabled={isInputDisabled}
            size="large"
            placeholder="Enter the word!"
            onPressEnter={handleInput}
          />
        </Form.Item>
      </Form>
      <StyledMessage> {gameOverMsg || error}</StyledMessage>
    </StyledSpace>
  );
};

export default GamePage;
