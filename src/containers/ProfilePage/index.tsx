import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  StyledSpace,
  StyledList,
  StyledText,
  StyledContainer,
  StyledArrow,
} from "../MenuPage/styles";
import { useNavigate } from "react-router";
import { Space } from "antd";
import type { DescriptionsProps } from "antd";
import { userSelector } from "../../redux/users/selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserInfo from "../../components/UserInfo";
const ProfilePage = () => {
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
          <StyledText style={{ color: "white" }}>Profile</StyledText>
          <div></div>
        </Space>
        <UserInfo />{" "}
      </StyledContainer>
    </StyledSpace>
  );
};
export default ProfilePage;
