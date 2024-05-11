import { createSlice } from "@reduxjs/toolkit";
import { userState } from "./types";

export const initialState: userState = {
  user: {
    currentUser:null,
    userData: null,
    userStats: null
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, {payload}) => {
      state.user.currentUser = payload;
    },
    setUserData: (state, {payload}) => {
      state.user.userData = payload;
    },
    setUserStats: (state, {payload}) => {
      state.user.userStats = payload;
    },
  },
});

export const { setUserData ,setCurrentUser,setUserStats} = userSlice.actions;
export default userSlice.reducer;
