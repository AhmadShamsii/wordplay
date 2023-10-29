import { call, put, takeEvery, select } from "redux-saga/effects";
import { fetchWordsRequest, fetchWordsSuccess, fetchWordsError } from "./slice";
import axios from "axios";
import { message } from "antd";

const usedWords: any = [];
function* workGetWordsFetch({ payload }: any): any {
  try {
    if (usedWords.includes(payload)) {
      yield put(fetchWordsError("This word has already been used."));
    } else {
      const response = yield call(
        axios.get,
        `https://api.dictionaryapi.dev/api/v2/entries/en/${payload}`
      );
      const words = response;
      usedWords.push(payload);
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
