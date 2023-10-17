import { call, put, takeEvery } from "redux-saga/effects";
import { Words } from "./types";
import { fetchWordsRequest, fetchWordsSuccess } from "./slice";
import axios from "axios";

function* workGetWordsFetch({ payload }: any): any {
  console.log(payload);
  const response = yield call(
    axios.get,
    `https://api.dictionaryapi.dev/api/v2/entries/en/${payload}`
  );
  const words: Words[] = response;
  console.log(words);
  yield put(fetchWordsSuccess(words));
}
export default wordsSaga;

export function* wordsSaga() {
  yield takeEvery(fetchWordsRequest, workGetWordsFetch);
}
