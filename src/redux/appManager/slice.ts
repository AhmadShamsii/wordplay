import { createSlice } from "@reduxjs/toolkit";
import { appStates } from "./types";

export const initialState: appStates = {
  appManager: {
    isSignInModalOpen: false,
    isSignUpModalOpen: false,
  }
};

export const appManagerSlice = createSlice({
  name: "appManager",
  initialState,
  reducers: {
    setIsSignInModalOpen: (state, { payload }) => {
      state.appManager.isSignInModalOpen = payload;
    },
    setIsSignUpModalOpen: (state, { payload }) => {
      state.appManager.isSignUpModalOpen = payload;
    },
  },
});

export const { setIsSignInModalOpen,setIsSignUpModalOpen } = appManagerSlice.actions;
export default appManagerSlice.reducer;
