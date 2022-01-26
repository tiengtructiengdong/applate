import {RegisterData} from '@constants/Types';
import {getAllParkingLotsSuccessAction} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';
import {getAllParkingLots} from '@services/parkingLotServices';
import {authSelector} from '@store/selectors/authSelector';

const getAllParkingLotsSaga = function* (action: AnyAction) {
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(getAllParkingLots, auth);
    const data = parseRawDataResponse(response, true);
    console.log('yeet', data);
    if (data) {
      yield* put(getAllParkingLotsSuccessAction(data));
    } else {
      const errorMessage = response?.data?.error?.message;
      if (errorMessage) {
        popUp(errorMessage);
      }
    }
  } catch (error: any) {
    popUp(error.message);
  } finally {
    //yield* put(updateSessionAction({loading: false}));
  }
};

export default function* () {
  yield* all([takeLatest('GET_ALL_PARKING_LOTS', getAllParkingLotsSaga)]);
}
