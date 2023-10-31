import { initialState } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
const wordsInitialState = (state: any) => state.words || initialState;

const wordsSelector = createSelector(
  [wordsInitialState],
  (state) => state.words
);
const scoreSelector = createSelector(
  [wordsInitialState],
  (state) => state.score
);
const letterSelector = createSelector(
  [wordsInitialState],
  (state) => state.randomLetter
);
const timeSelector = createSelector(
  [wordsInitialState],
  (state) => state.time
);

export { wordsSelector, scoreSelector ,letterSelector,timeSelector};
