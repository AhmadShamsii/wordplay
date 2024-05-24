import {
  StyledArrow,
  StyledContainer,
  StyledList,
  StyledSpace,
  StyledText,
} from "./styles";
import { useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import { setIsSignInModalOpen } from "../../redux/appManager/slice";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/users/selector";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";

const MenuPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(userSelector);

  const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const MenuItemsForUsers = () => {
    return (
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
    );
  };

  const MenuItemsForGuests = () => {
    return (
      <StyledList>
        <StyledText
          onClick={() => dispatch(setIsSignInModalOpen(true))}
          style={{ color: "white" }}
        >
          Sign In
        </StyledText>
        <SignInForm />
        <SignUpForm />
        <StyledText
          onClick={() => navigate("/menu/how-to-play")}
          style={{ color: "white" }}
        >
          How to Play
        </StyledText>
      </StyledList>
    );
  };
  return (
    <StyledSpace>
      <StyledContainer>
        <StyledArrow onClick={() => navigate("/play")} />
        {currentUser?.isAnonymous ? (
          <MenuItemsForGuests />
        ) : (
          <MenuItemsForUsers />
        )}
      </StyledContainer>
    </StyledSpace>
  );
};
export default MenuPage;
