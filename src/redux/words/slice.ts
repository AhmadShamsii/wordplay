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
    fetchWordsSuccess: (state, { payload }) => {
      if (!state.time.isTimeEnd) {
        state.score.points = state.score.points + payload?.data[0].word.length;
        state.score.totalWords = state.score.totalWords + 1;
      }
      
      state.words.wordsData = payload;
      state.words.isLoading = false;
    },
    fetchWordsError: (state, {payload}) => {
      state.words.error = payload;
      state.words.isLoading = false;
    },
    setTimeStart: (state, {payload}) => {
      state.time.isTimeStart = payload;
    },
    setTimeEnd: (state, {payload}) => {
      state.time.isTimeEnd = payload;
    },
    settingRandomLetter: (state, {payload}) => {
      console.log(payload,'asdasd')
      state.randomLetter = payload;
    },
    clearErrorMsg: (state) => {
      state.words.error = "";
    },
    clearScore: (state) => {
      state.score.points = 0;
      state.score.totalWords = 0;
    },
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
  clearScore,
} = wordsSlice.actions;
export default wordsSlice.reducer;
