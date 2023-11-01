import { call, put, takeEvery } from "redux-saga/effects";
import { fetchWordsRequest, fetchWordsSuccess, fetchWordsError } from "./slice";
import axios from "axios";
import { message } from "antd";

const usedWords: any = [];

function* workGetWordsFetch({ payload }: any): any {
  const { word, letter, isTimeStart, isTimeEnd } = payload;
  console.log(word, letter, isTimeStart, isTimeEnd);
  try {
    if (usedWords.includes(word)) {
      throw new Error("This word has already been used!");
    } else if (!word.startsWith(letter)) {
      throw new Error(`Entered word doesnot starts with ${letter}!`);
    } else if (isTimeEnd) {
      throw new Error(`Times Up! Game Over!! `);
    } else {
      const response = yield call(
        axios.get,
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      console.log(response);
      const words = response;
      usedWords.push(word);
      yield put(fetchWordsSuccess(words));
      throw new Error("");
    }
  } catch (err: any) {
    yield put(fetchWordsError(err.message));

    if (err.code === "ERR_BAD_REQUEST") {
      yield put(fetchWordsError("Invalid word!"));
    }
  }
}

export default wordsSaga;

export function* wordsSaga() {
  yield takeEvery(fetchWordsRequest.type, workGetWordsFetch);
}
