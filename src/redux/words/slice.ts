import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WordsState, Words } from "./types";

export const initialState: WordsState = {
  words: {
    wordsData: null,
    isLoading: false,
  },
  score: {
    words: 0,
    points: 0,
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
      
      console.log(action.payload.data[0].word.length, "word");
      state.words.wordsData = action.payload;
      state.words.isLoading = false;
    },
    fetchWordsError: (state) => {
      state.words.isLoading = false;
    },
  },
});

export const { fetchWordsRequest, fetchWordsSuccess, fetchWordsError } =
  wordsSlice.actions;
export default wordsSlice.reducer;
