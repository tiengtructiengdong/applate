import {fork} from 'redux-saga/effects';
import authSaga from './authSaga';
//import sessionSagas from './sessionSagas';

export default function* rootSaga() {
  yield fork(authSaga);
}
