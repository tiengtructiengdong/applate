import {RegisterData} from '@constants/Types';
import {register, login, logout} from '@services/authServices';
import {loginSuccessAction, logoutSuccessAction} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';

const registerSaga = function* (action: AnyAction) {
  const registerData: RegisterData = action.registerData;
  console.log('regyeeet');

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

const loginSaga = function* (action: AnyAction) {
  const {number, password} = action;
  console.log('loginyeeet');

  try {
    //yield* put(updateSessionAction({loading: true}));
    const response = yield* call(login, number, password);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(loginSuccessAction(data));
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

const logoutSaga = function* (action: AnyAction) {
  const {number, password} = action;

  try {
    //yield* put(updateSessionAction({loading: true}));
    const response = yield* call(login, number, password);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(logoutSuccessAction(data));
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
  yield* all([
    takeLatest('REGISTER', registerSaga),
    takeLatest('LOGIN', loginSaga),
    takeLatest('LOGOUT', logoutSaga),
  ]);
}
