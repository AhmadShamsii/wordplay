import { createSlice } from "@reduxjs/toolkit";
import { WordsState } from "./types";

export const initialState: WordsState = {
  words: {
    wordsData: null,
    isLoading: false,
    error: "",
  },
  score: {
    totalWords: 0,
    points: 0,
  },
  time: {
    isTimeStart: false,
    isTimeEnd: false,
  },
  randomLetter: {
    letter: "",
  },
};

export const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    fetchWordsRequest: (state) => {
      state.words.isLoading = true;
    },
    fetchWordsSuccess: (state, action) => {
      if (!state.time.isTimeEnd) {
        state.score.points =
          state.score.points + action.payload.data[0].word.length;
        state.score.totalWords = state.score.totalWords + 1;
      }

      state.words.wordsData = action.payload;
      state.words.isLoading = false;
    },
    fetchWordsError: (state, action) => {
      state.words.error = action.payload;
      state.words.isLoading = false;
    },
    setTimeStart: (state, action) => {
      state.time.isTimeStart = action.payload;
    },
    setTimeEnd: (state, action) => {
      state.time.isTimeEnd = action.payload;
    },
    settingRandomLetter: (state, action) => {
      state.randomLetter = action.payload;
    },
    clearErrorMsg: (state) => {
      state.words.error = "";
    },
    clearScore: (state) => {
      state.score.points = 0;
      state.score.totalWords = 0;
    }
  },
});

export const {
  fetchWordsRequest,
  fetchWordsSuccess,
  fetchWordsError,
  setTimeStart,
  setTimeEnd,
  clearErrorMsg,
  settingRandomLetter,
  clearScore
} = wordsSlice.actions;
export default wordsSlice.reducer;
