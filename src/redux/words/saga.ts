import { call, put, takeEvery } from "redux-saga/effects";
import { Words } from "./types";
import { fetchWordsRequest, fetchWordsSuccess } from "./slice";
import axios from "axios";
import { message } from "antd";

function* workGetWordsFetch({ payload }: any): any {
  try {
    const response = yield call(
      axios.get,
      `https://api.dictionaryapi.dev/api/v2/entries/en/${payload}`
    );
    const words: Words[] = response;
    yield put(fetchWordsSuccess(words));
  } catch (err: any) {
    if ((err.code = "ERR_BAD_REQUEST")) {
      message.error("Invalid word!");
      console.log(err, "errpr");
    }
  }
}
export default wordsSaga;

export function* wordsSaga() {
  yield takeEvery(fetchWordsRequest, workGetWordsFetch);
}
