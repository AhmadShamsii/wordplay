import { message } from "antd";
import { signInWithGooglePopup } from "../utils/firebase/firebase";
import { useDispatch } from "react-redux";
import { setIsSignInModalOpen } from "../redux/appManager/slice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase/firebase";
import { useNavigate } from "react-router";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router";

interface SignInWithGoogleProps {
  dispatch: Dispatch;
  navigate: NavigateFunction;
}

export const signInWithGoogle = async ({
  dispatch,
  navigate,
}: SignInWithGoogleProps) => {
  const result = await signInWithGooglePopup();
  const user = result?.user;
  const userRef = doc(db, "users", user?.uid);
  await setDoc(userRef, {
    email: user?.email,
    username: user?.displayName,
    createdAt: new Date(),
  });
  message.success("Welcome");
  dispatch(setIsSignInModalOpen(false));
  navigate("/play");
};
