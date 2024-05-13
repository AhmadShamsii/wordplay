import { initialState } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
const appManagerInitialStates = (state: any) => state.appManager || initialState;

const appManagerSelector = createSelector(
  [appManagerInitialStates],
  (state) => state.appManager
);

export { appManagerSelector};
