import { ArrowLeftOutlined } from "@ant-design/icons";
import { StyledSpace, StyledSpace2, StyledText } from "../MenuPage/styles";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <StyledSpace>
      <ArrowLeftOutlined
        style={{ position: "relative", right: "88px" }}
        onClick={() => navigate(-1)}
      />
      <StyledSpace2>
        <StyledText
          onClick={() => navigate("/menu/profile")}
          style={{ color: "white" }}
        >
          Profile
        </StyledText>
        <StyledText
          onClick={() => navigate("/menu/stats")}
          style={{ color: "white" }}
        >
          Stats
        </StyledText>
        <StyledText
          onClick={() => navigate("/menu/leaderboards")}
          style={{ color: "white" }}
        >
          LeaderBoard
        </StyledText>
        <StyledText
          onClick={() => navigate("/menu/settings")}
          style={{ color: "white" }}
        >
          Settings
        </StyledText>
      </StyledSpace2>
    </StyledSpace>
  );
};
export default ProfilePage;
