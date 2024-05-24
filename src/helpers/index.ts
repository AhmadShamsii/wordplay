import { message } from "antd";
import { signInWithGooglePopup } from "../utils/firebase/firebase";
import { useDispatch } from "react-redux";
import { setIsSignInModalOpen } from "../redux/appManager/slice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase/firebase";
import { useNavigate } from "react-router";
const dispatch = useDispatch();
const navigate = useNavigate();

export const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup();
    const user = result?.user;
    const userRef = doc(db, "users", user?.uid);
    await setDoc(userRef, {
      email: user?.email,
      username: user?.displayName,
      createdAt: new Date()
    });
    message.success("Account created successfully!");
    dispatch(setIsSignInModalOpen(false));
    navigate("/play");
  };