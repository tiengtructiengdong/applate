import {RegisterData} from '@constants/Types';
import {register, login, logout} from '@services/authServices';
import {loginSuccessAction, logoutSuccessAction} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';

const getAllParkingLotSaga = function* (action: AnyAction) {
  const registerData: RegisterData = action.registerData;

  try {
    //yield* put(updateSessionAction({loading: true}));
    const response = yield* call(register, registerData);
    const data = parseRawDataResponse(response, true);
    if (data) {
      //yield* put(signUpSuccessAction(result, dataToken));
      console.log('yeet', data);
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
  yield* all([takeLatest('GET_ALL_PARKING_LOT', getAllParkingLotSaga)]);
}
