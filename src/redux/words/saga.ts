import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchWordsRequest, fetchWordsSuccess, fetchWordsError } from "./slice";
import axios from "axios";
import { message } from "antd";

const usedWords: any = [];

function* workGetWordsFetch(action: any): any {
  const { word, letter } = action.payload;
  console.log(letter);
  try {
    if (usedWords.includes(word)) {
      yield put(fetchWordsError("This word has already been used."));
    } else {
      const response = yield call(
        axios.get,
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const words = response;
      usedWords.push(word);
      yield put(fetchWordsSuccess(words));
    }
  } catch (err: any) {
    if (err.code === "ERR_BAD_REQUEST") {
      message.error("Invalid word!");
      console.log(err, "error");
    }
    // Handle other errors here and dispatch an error action if necessary
  }
}

export default wordsSaga;

export function* wordsSaga() {
  yield takeEvery(fetchWordsRequest, workGetWordsFetch);
}
