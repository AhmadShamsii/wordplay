import { initialState } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
const usersInitialState = (state: any) => state || initialState;

const usersSelector = createSelector(
  [usersInitialState],
  (state) => state.user.user
);

export { usersSelector };
