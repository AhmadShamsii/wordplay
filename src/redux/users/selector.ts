import { initialState } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
const userInitialState = (state: any) => state.user || initialState;

const userSelector = createSelector(
  [userInitialState],
  (state) => state.user
);

export { userSelector};
