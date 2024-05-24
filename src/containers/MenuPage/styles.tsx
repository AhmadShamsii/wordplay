import styled from "styled-components";
import {Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
const {  Link } = Typography;

export const StyledSpace = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 60vh;
`;
export const StyledContainer = styled.div`
  width: 300px;
  height: 200px;
  padding: 20px;
  position: relative;
`;
export const StyledArrow = styled(ArrowLeftOutlined)`
  position: absolute;
  top: 0;
  left: 0;
`;
export const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const StyledText = styled(Link)`
  font-family: "Handlee", cursive;
  font-size: 25px;
`;
