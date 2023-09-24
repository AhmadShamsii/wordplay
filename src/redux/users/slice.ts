import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addUserSuccess: (state) => {
      state.loading = false;
    },
    addUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addUserRequest, addUserSuccess, addUserFailure } = userSlice.actions;
export default userSlice.reducer;