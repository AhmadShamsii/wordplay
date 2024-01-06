import { ArrowLeftOutlined } from "@ant-design/icons";
import { StyledSpace, StyledSpace2, StyledText } from "../ProfilePage/styles";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";

const ProfilePage = () => {
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
        <StyledText>Profile</StyledText>
        <StyledText>Stats</StyledText>
        <StyledText>LeaderBoard</StyledText>
        <StyledText>Settings</StyledText>
        <StyledText onClick={handleLogout}>Logout</StyledText>
      </StyledSpace2>
    </StyledSpace>
  );
};
export default ProfilePage;
