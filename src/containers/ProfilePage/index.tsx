import {
  StyledSpace,
  StyledText,
  StyledContainer,
  StyledArrow,
} from "../MenuPage/styles";
import { useNavigate } from "react-router";
import { Space } from "antd";
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
