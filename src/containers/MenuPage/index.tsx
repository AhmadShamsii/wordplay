import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  StyledArrow,
  StyledContainer,
  StyledList,
  StyledSpace,
  StyledText,
} from "./styles";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";

const MenuPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <StyledSpace>
      <StyledContainer>
        <StyledArrow onClick={() => navigate("/play")} />
        <StyledList>
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
            onClick={() => navigate("/menu/how-to-play")}
            style={{ color: "white" }}
          >
            How to Play
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
          <StyledText style={{ color: "white" }} onClick={handleLogout}>
            Logout
          </StyledText>
        </StyledList>
      </StyledContainer>
    </StyledSpace>
  );
};
export default MenuPage;
