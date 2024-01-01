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
  clearErrorMsg,
  setTimeEnd,
  clearScore,
  settingRandomLetter,
} from "../../redux/words/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  wordsSelector,
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

  const [gameOverMsg, setGameOverMsg] = useState("");
  const [playAgainBtn, setPlayAgainButton] = useState(false);
  const [games, setGames] = useState<number>(1);

  const [scoreData, setScoreData] = useState({
    totalGames: 0,
    totalWords: 0,
    points: 0,
    bestTotalWords: 0,
    bestPoints: 0,
  });

  console.log(scoreData);

  const getRandomAlphabet = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randLetter = alphabet[randomIndex];
    setRandomLetter(randLetter);
  };

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

    setPlayAgainButton(false);
  };

  const handleCountdown = () => {
    setShowCountdown(true);
    setShowStartBtn(false);
  };

  const handlePlayAgain = () => {
    // handleCountdown();
    getRandomAlphabet();
    setShowCountdownLimit(true);
    setPlayAgainButton(false);
    setIsInputDisabled(false);
    setGameOverMsg("");
    form.resetFields();

    dispatch(clearScore());

    // dispatch(setTimeEnd(false));
  };

  const handleScore = (points: number, totalWords: number) => {
    setGames((prevGames) => prevGames + 1);
    const newTotalWordsValue = scoreData.totalWords + totalWords;
    const newPointsValue = scoreData.points + points;

    const bestTotalWords = Math.max(scoreData.bestTotalWords, totalWords);
    const bestPoints = Math.max(scoreData.bestPoints, points);

    // Update the state with the new values
    setScoreData({
      totalGames: games,
      totalWords: newTotalWordsValue,
      points: newPointsValue,
      bestTotalWords,
      bestPoints,
    });
  };

  const handleGameOver = () => {
    setGameOverMsg("Times Up! Game Over!!");
    setPlayAgainButton(true);
    setRandomLetter("");
    setIsInputDisabled(true);

    setShowCountdownLimit(false);

    dispatch(setTimeEnd(false));
    dispatch(clearErrorMsg());
    handleScore(points, totalWords);
  };

  const handleInput = (e: any) => {
    const payload: any = {
      word: e.target.value.toLowerCase(),
      letter: randomLetter.toLowerCase(),
      isTimeStart: isTimeStart,
      isTimeEnd: isTimeEnd,
    };
    console.log(payload);
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
    setPlayAgainButton(false);
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
        <StyledButton onClick={handlePlayAgain} type="primary">
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
                startFrom={5}
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
