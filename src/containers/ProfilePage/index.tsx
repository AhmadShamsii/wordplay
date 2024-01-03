import { ArrowLeftOutlined } from "@ant-design/icons";
import { StyledSpace, StyledSpace2, StyledText } from "../ProfilePage/styles";
import { useNavigate } from "react-router";
const ProfilePage = () => {
  const navigate = useNavigate();
  // gotta chanage the route
  return (
    <StyledSpace>
      <ArrowLeftOutlined onClick={() => navigate(-1)} />
      <StyledSpace2>
        <StyledText>Profile</StyledText>
        <StyledText>Stats</StyledText>
        <StyledText>LeaderBoard</StyledText>
        <StyledText>Settings</StyledText>
        <StyledText>Logout</StyledText>
      </StyledSpace2>
    </StyledSpace>
  );
};
export default ProfilePage;
