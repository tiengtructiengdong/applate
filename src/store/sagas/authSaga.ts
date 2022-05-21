import {RegisterData} from '@constants/Types';
import {register, login, logout} from '@services/authServices';
import {
  addParkingLotAction,
  loginAction,
  loginSuccessAction,
  logoutSuccessAction,
} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {errString, parseRawDataResponse, popUp} from '@constants/Utils';

const registerSaga = function* (action: AnyAction) {
  const {registerData, onSuccess} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const response = yield* call(register, registerData);
    if (response.status === 400) {
      console.log(response);
      const errorMessage = response?.data?.message;
      throw new Error(errorMessage || 'ID or Phone number\nis registered!');
    }
    popUp('Registration success!', 'You can continue with the app.');
    onSuccess();
    yield* put(loginAction(registerData.officialId, registerData.password));
  } catch (error: any) {
    popUp(error.message, 'Please try again');
  } finally {
    //yield* put(updateSessionAction({loading: false}));
  }
};

const loginSaga = function* (action: AnyAction) {
  const {number, password} = action;

  try {
    //yield* put(updateSessionAction({loading: true}));
    const response = yield* call(login, number, password);
    const data = parseRawDataResponse(response, true);
    if (response.status == 200) {
      yield* put(loginSuccessAction(data));
    } else {
      throw new Error(String(response.status));
    }
  } catch (error: any) {
    switch (error.message) {
      case '400':
        popUp('Invalid username\nor password', 'Please check again');
        return;
      default:
        popUp('Unknown error', error.message);
        return;
    }
  } finally {
    //yield* put(updateSessionAction({loading: false}));
  }
};

const logoutSaga = function* (action: AnyAction) {
  const {id} = action;

  try {
    //yield* put(updateSessionAction({loading: true}));
    yield* put(logoutSuccessAction());
    const response = yield* call(logout, id);
    const data = parseRawDataResponse(response, true);
    if (data) {
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
  yield* all([
    takeLatest('REGISTER', registerSaga),
    takeLatest('LOGIN', loginSaga),
    takeLatest('LOGOUT', logoutSaga),
  ]);
}
