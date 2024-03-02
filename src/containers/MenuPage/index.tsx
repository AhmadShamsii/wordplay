import { ArrowLeftOutlined } from "@ant-design/icons";
import { StyledSpace, StyledSpace2, StyledText } from "./styles";
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

  // gotta chanage the route
  return (
    <StyledSpace>
      <ArrowLeftOutlined onClick={() => navigate(-1)} />
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
        <StyledText style={{ color: "white" }} onClick={handleLogout}>
          Logout
        </StyledText>
      </StyledSpace2>
    </StyledSpace>
  );
};
export default MenuPage;
