import { initialState } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
const usersInitialState = (state: any) => state.users || initialState;

const usersSelector = createSelector(
  [usersInitialState],
  (state) => state.users
);

export { usersSelector };
