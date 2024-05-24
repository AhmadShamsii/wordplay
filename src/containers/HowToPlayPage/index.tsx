import React from "react";
import {
  StyledArrow,
  StyledContainer,
  StyledSpace,
  StyledText,
} from "../MenuPage/styles";
import { Space } from "antd";
import { useNavigate } from "react-router";
const HowToPlayPage = () => {
  const navigate = useNavigate();
  return (
    <StyledSpace>
      <StyledContainer>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <StyledArrow onClick={() => navigate(-1)} />
          <StyledText style={{ color: "white" }}>How To Play</StyledText>
          <div></div>
        </Space>
        <p style={{ textAlign: "center", fontFamily: "Handlee" }}>
          You will see random letters on your screen. Write the first word that
          comes to your mind that starts with that letter. You will have 5
          seconds to write a word, after that another letter pops up and do the
          same. You can't repeat a word and the game ends when you failed to
          write a word in the time limit. Ready to play? Have fun!
        </p>
      </StyledContainer>
    </StyledSpace>
  );
};

export default HowToPlayPage;
