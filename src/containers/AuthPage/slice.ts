import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";

export const initialState: UserState = {
  user: {
    userData: [],
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user.userData = action.payload;
      state.user.loading = true;
      state.user.error = null;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
