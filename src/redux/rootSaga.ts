import { fork, all } from "redux-saga/effects";

import wordsSaga from "./words/saga";
export function* rootSaga() {
  yield all([ fork(wordsSaga)]);
}

export default rootSaga;
