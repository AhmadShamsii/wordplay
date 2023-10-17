import { fork, all } from "redux-saga/effects";

import usersSaga from "./users/saga";
import wordsSaga from "./words/saga";
export function* rootSaga() {
  yield all([fork(usersSaga), fork(wordsSaga)]);
}

export default rootSaga;
