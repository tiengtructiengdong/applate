import {RegisterData} from '@constants/Types';
import {register, login, logout} from '@services/authServices';
import {
  loginAction,
  loginSuccessAction,
  logoutSuccessAction,
} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {errString, parseRawDataResponse, popUp} from '@constants/Utils';

const registerSaga = function* (action: AnyAction) {
  const registerData: RegisterData = action.registerData;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const response = yield* call(register, registerData);
    if (response.status === 400) {
      throw new Error('ID or Phone number\nis registered!');
    }
    popUp('Registration success!', 'You can continue with the app.');
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
    if (data) {
      yield* put(loginSuccessAction(data));
    } else {
      const errorMessage = response?.data?.error?.message;
      if (errorMessage) {
        popUp(errorMessage);
      }
    }
  } catch (error: any) {
    switch (error.message) {
      case errString(401):
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
    const response = yield* call(logout, id);
    console.log('yeet', response);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(logoutSuccessAction(data));
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
