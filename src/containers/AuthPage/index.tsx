import { Typography, Button } from "antd";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";
import { StyledButtons, StyledSpace, StyledText, StyledTitle } from "./styles";
import ConsoleSvg from "./../../utils/assets/console.svg";
import { useState } from "react";

const { Text } = Typography;
const AuthPage = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<Boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<Boolean>(false);

  const showSignInModal = () => {
    setIsSignInModalOpen(true);
  };
  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
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
      <Button type="primary">Continue as Guest</Button>
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
