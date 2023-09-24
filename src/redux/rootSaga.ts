import { fork, all } from "redux-saga/effects";

import usersSaga from "./users/saga";

function* rootSaga() {
  yield all([
    fork(usersSaga)
  ]);
}

export default rootSaga;
