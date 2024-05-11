import { useSelector } from "react-redux";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthPage from "./containers/AuthPage";
import HomePage from "./containers/HomePage";
import GamePage from "./containers/GamePage";
import { HelmetProvider } from "react-helmet-async";
import ProfilePage from "./containers/ProfilePage";
import MenuPage from "./containers/MenuPage";
import SettingsPage from "./containers/SettingsPage";
import { useEffect, useState } from "react";
import { auth } from "./utils/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUserData, setUserStats } from "./redux/users/slice";
import { userSelector } from "./redux/users/selector";
import firebase from "firebase/compat/app";
import StatsPage from "./containers/StatsPage";
import LeaderBoardPage from "./containers/LeaderboardPage";
const helmetContext = {};

function App() {
  const dispatch = useDispatch();
  const { currentUser, userData } = useSelector(userSelector);

  
  // this useEffect is used to set the user info
  useEffect(() => {
    async function getUserData(uid: any) {
      try {
        const docRef = firebase.firestore().collection("users").doc(uid);
        const snapshot = await docRef.get();
        if (snapshot.exists) {
          const user = snapshot.data();
          console.log(user, "user");
          const data = {
            name: user?.userInfo?.name,
            email: currentUser?.email,
            country: user?.userInfo?.country,
            age: user?.userInfo?.age,
          };
          dispatch(setUserData(data));
          if(user?.stats){
            dispatch(setUserStats(user?.stats))
          }
        } else {
          console.log("No user document found with the provided ID");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUserData(currentUser?.uid);
  }, []);

  // this useEffect is used to set the currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      dispatch(setCurrentUser(user));
    });

    // Unsubscribe to the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<AuthPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="play" element={<GamePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/profile" element={<ProfilePage />} />
          <Route path="menu/settings" element={<SettingsPage />} />
          <Route path="menu/stats" element={<StatsPage />} />
          <Route path="menu/leaderboards" element={<LeaderBoardPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
