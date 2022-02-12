import {fork} from 'redux-saga/effects';
import authSaga from './authSaga';
import customerSaga from './customerSaga';
import membershipSaga from './membershipSaga';
import parkingLotSaga from './parkingLotSaga';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(parkingLotSaga);
  yield fork(customerSaga);
  yield fork(membershipSaga);
}
