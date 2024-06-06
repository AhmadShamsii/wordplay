import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchWordsRequest, fetchWordsSuccess, fetchWordsError } from './slice';
import axios from 'axios';

function* workGetWordsFetch({ payload }: any): any {
  const { word, letter } = payload;
  try {
    if (!word.startsWith(letter)) {
      throw new Error(`Entered word doesnot starts with ${letter}!`);
    } else {
      const response = yield call(
        axios.get,
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      const words = response;
      yield put(fetchWordsSuccess(words));
      throw new Error('');
    }
  } catch (err: any) {
    yield put(fetchWordsError(err.message));

    if (err.code === 'ERR_BAD_REQUEST') {
      yield put(fetchWordsError('Invalid word!'));
    }
  }
}

export default wordsSaga;

export function* wordsSaga() {
  yield takeEvery(fetchWordsRequest.type, workGetWordsFetch);
}
