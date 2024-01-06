import { Button, message } from "antd";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";
import { StyledButtons, StyledSpace, StyledText, StyledTitle } from "./styles";
import ConsoleSvg from "./../../utils/assets/console.svg";
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase/firebase";

const AuthPage = () => {
  const navigate = useNavigate();

  const [isSignInModalOpen, setIsSignInModalOpen] = useState<Boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<Boolean>(false);

  const showSignInModal = () => {
    setIsSignInModalOpen(true);
  };
  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const handleAnonymousSignIn = () => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        navigate("home");
        message.success("Welcome!");
      })
      .catch((error) => {
        message.error("Error getting in!");
      });
  };

  return (
    <StyledSpace>
      <StyledTitle>WordPlay</StyledTitle>
      <img src={ConsoleSvg} alt="Your SVG" />
      <StyledText>Relax and play with words</StyledText>
      <StyledText>Les gooo!</StyledText>
      <StyledButtons>
        <Button onClick={showSignInModal} style={{ marginRight: "20px" }}>
          Sign In
        </Button>
        <Button onClick={showSignUpModal}>Sign Up</Button>
      </StyledButtons>
      <Button
        onClick={handleAnonymousSignIn}
        style={{ padding: "0 30px" }}
        type="primary"
      >
        Continue as Guest
      </Button>
      <SignInForm
        isSignInModalOpen={isSignInModalOpen}
        setIsSignInModalOpen={setIsSignInModalOpen}
        showSignUpModal={showSignUpModal}
      />
      <SignUpForm
        isSignUpModalOpen={isSignUpModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
        showSignInModal={showSignInModal}
      />
    </StyledSpace>
  );
};
export default AuthPage;
