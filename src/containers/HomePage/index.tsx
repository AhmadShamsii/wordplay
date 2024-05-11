import {
  StyledButton,
  StyledSpace,
  StyledText,
  StyledTitle,
  StyledTitle2,
} from "./styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/users/selector";

const HomePage = () => {
  const { currentUser } = useSelector(userSelector);

  return (
    <StyledSpace>
      <StyledTitle>Hello, {currentUser?.displayName || "Guest"}</StyledTitle>
      <StyledTitle2>Welcome to Wordplay!</StyledTitle2>
      <StyledTitle>How To Play</StyledTitle>
      <StyledText>
        You will see random letters on your screen. Write the first word that
        comes to your mind that starts with that word. You will have 5 seconds
        to write a word. After that another word pops up and do the same. You
        can't repeat a word and the game ends when you failed to write a word in
        the time limit. You will get points based on the number of letters in
        your words. For Example if you write dog you will get 3 points but if
        you write dinasour you will get 8 points. Now you ready to play, have
        fun!
      </StyledText>
      <Link to="/play">
        <StyledButton type="primary">Lets Begin!</StyledButton>
      </Link>
    </StyledSpace>
  );
};
export default HomePage;
