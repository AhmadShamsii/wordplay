import { Avatar, Form, Input, Space } from "antd";
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
import { useEffect, useRef, useState } from "react";
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
import { usersSelector } from "../AuthPage/selectors";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useNavigate } from "react-router";
import { auth } from "../../utils/firebase/firebase";

const GamePage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userData } = useSelector(usersSelector);
  const currentUser = auth?.currentUser;
  console.log(currentUser, "currentuser");
  console.log(userData, "userData");
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
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const ref = useRef<any>(null);

  // Function to get a random alphabet and update the Redux state
  const getRandomAlphabet = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randLetter = alphabet[randomIndex];
    setRandomLetter(randLetter);
  };

  // Effect to initialize random alphabet when wordsData changes
  useEffect(() => {
    if (wordsData) {
      getRandomAlphabet();
      dispatch(settingRandomLetter(randomLetter));
    }
  }, [wordsData, dispatch]);

  // focus when game starts
  useEffect(() => {
    ref.current.focus();
  }, [isInputDisabled]);

  // Handler for starting the game
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

  // Handler for playing again

  const handlePlayAgain = () => {
    // handleCountdown();
    getRandomAlphabet();
    setShowCountdownLimit(true);
    setPlayAgainButton(false);
    setIsInputDisabled(false);
    setGameOverMsg("");
    dispatch(clearScore());

    // dispatch(setTimeEnd(false));
  };
  // Function to update user data in Firestore
  const updateUserData = async () => {
    const scoreData = {
      totalGames: 0,
      totalWords: 0,
      points: 0,
      bestTotalWords: 0,
      bestPoints: 0,
    };
    setGames((prevGames) => prevGames + 1);
    const newTotalWordsValue = scoreData.totalWords + totalWords;
    const newPointsValue = scoreData.points + points;

    const bestTotalWords = Math.max(scoreData.bestTotalWords, totalWords);
    const bestPoints = Math.max(scoreData.bestPoints, points);

    const uid = currentUser?.uid;
    const userRef = firebase.firestore().collection("users").doc(uid);
    const stats = {
      totalGames: games,
      totalWords: newTotalWordsValue,
      totalPoints: newPointsValue,
      bestTotalWords: bestTotalWords,
      bestTotalPoints: bestPoints,
    };
    console.log(stats, "stattttttttttts");
    try {
      // Get the current user data
      const doc = await userRef.get();

      if (doc.exists) {
        await userRef.update({ stats: stats });
        console.log("User data updated successfully");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  // Handler for game over
  const handleGameOver = () => {
    setGameOverMsg("Times Up! Game Over!!");
    setPlayAgainButton(true);
    setRandomLetter("");
    setIsInputDisabled(true);

    setShowCountdownLimit(false);

    dispatch(setTimeEnd(false));
    dispatch(clearErrorMsg());
    setUsedWords([]);
    form.resetFields();
    updateUserData();
  };

  //profile
  //stats
  //leaderboard
  //settings
  //logout

  // Handler for input changes
  const handleInput = (e: any) => {
    const payload: any = {
      word: e.target.value.toLowerCase(),
      letter: randomLetter.toLowerCase(),
    };
    if (!isTimeEnd) {
      setUsedWords((prevWords) => [...prevWords, payload.word]);
      if (usedWords.includes(payload.word)) setGameOverMsg("already used");
      else if (!usedWords.includes(payload.word)) {
        setGameOverMsg("");
        dispatch(fetchWordsRequest(payload));
      }
    } else if (isTimeEnd) {
      handleGameOver();
    }
    form.resetFields();
  };

  const handleTimeUp = () => {
    dispatch(setTimeEnd(true));
  };

  // Handler for starting the countdown
  const handleCountdownStart = () => {
    dispatch(setTimeStart(true));
    setPlayAgainButton(false);
  };

  // Effect to handle game over when isTimeEnd changes
  useEffect(() => {
    if (isTimeEnd) {
      handleGameOver();
    }
  }, [isTimeEnd]);

  return (
    <StyledSpace>
      <Space>
        <StyledTitle>Wordplay</StyledTitle>
        {!currentUser?.isAnonymous && (
          <Avatar
            onClick={() => navigate("/profile")}
            style={{
              backgroundColor: "#1890ff",
              verticalAlign: "middle",
            }}
            size="large"
          >
            AS
          </Avatar>
        )}
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
            ref={ref}
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
