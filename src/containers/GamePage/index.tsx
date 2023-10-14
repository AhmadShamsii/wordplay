import { Avatar, Button, Input, Space } from "antd";
import { StyledTitle } from "../HomePage/styles";
import {
  StyledSpace,
  StyledLetter,
  StyledSpace2,
  StyledScore,
  StyledButton,
} from "./styles";
import Countdown from "../../components/Countdown";
import { useState } from "react";
import RandomAlphabet from "../../components/RandomLetter";
const GamePage = () => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [showCountdownLimit, setShowCountdownLimit] = useState(false);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [showLetter, setShowLetter] = useState(false);

  const handleGameStart = () => {
    setShowLetter(true);
    setShowCountdown(false);
    setShowStartBtn(false);

    setShowCountdownLimit(true);
  };
  const handleCountdown = () => {
    setShowCountdown(true);
    setShowStartBtn(false);
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
              <Countdown startFrom={5} onCountdownEnd={handleGameStart} />
            )}
          </StyledScore>
        </div>
      </StyledSpace2>
      <br />
      <Input
        // style={{ width: "15%" }}
        size="large"
        placeholder="Enter the word!"
      />
    </StyledSpace>
  );
};

export default GamePage;
