import styled from "styled-components";
import { Button } from "antd";
export const StyledSpace = styled.div`
  text-align: center;
  width: 300px;
  height: 200px;
  padding: 20px;  
  margin-top: 150px;
  position: relative;
  top: 0%;
  left: 50%;
  transform: translate(-50%,-50%);
`;
export const StyledLetter = styled.h1`
  color: #ebf2fa;
  font-size: 80px;
  margin: 3% 0;
`;
export const StyledButton = styled(Button)`
  margin: 14% 0;
  font-family: Croissant One;
  width: 200px;
  height: 50px;
  font-size: 20px;
`;
export const StyledScore = styled.h1`
  color: #ebf2fa;
  font-size: 20px;
`;
export const StyledSpace2 = styled.div`
  margin-top: 3%;
  display: flex;
  justify-content: space-between;
`;

export const StyledMessage = styled.p`
  margin-top: 10%;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
export const StyledTitle = styled.h1`
  font-family: "Croissant One", cursive;
  color: #ebf2fa;
  font-size: 30px;
`;