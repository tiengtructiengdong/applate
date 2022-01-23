import * as api from '@services/index';
import {call, put, select} from 'typed-redux-saga';
//import {tokenSelector} from '@selectors/sessionSelectors';
//import {updateSessionAction} from '@actionTypes/sessionActionTypes';
//import {logoutAction} from '@actionTypes/sessionActionTypes';
//import {refreshToken} from './sessionSagas';
//import {ApiParams, IBodyCreatePost} from '@constants/Types';
import {RootState} from '@store/index';
import moment from 'moment';

//AUTH
export function* apiPostalCode(postalCode: string): any {
  //return yield call(api.postalCode, postalCode);
}

// UTILS
export function* apiCallProxy(...args: any[]): any {
  try {
    const isRefreshingToken = yield select(
      state => state.session.isRefreshingToken,
    );
    if (isRefreshingToken) {
      // Is refreshing token, try again later
      setTimeout(() => {
        return apiCallProxy(...args);
      }, 1000);
    }

    const tokenExpiry = yield select(
      (state: RootState) => state.session.tokenExpiration,
    );
    if (!tokenExpiry) {
      return;
    }

    if (moment().utc().unix() + 5 * 60 > moment(tokenExpiry).unix()) {
      try {
        // Calling refresh token
        console.log('===Start refreshing token');
        //yield refreshToken();
      } catch (errorRefreshToken) {
        // Cannot refresh token => Should Logout
        console.log(errorRefreshToken);
        console.log('=======SHOULD LOGOUT HERE======');
        yield put(logoutAction());
        return;
      }
    }

    // Call api as normal
    // @ts-ignore
    return yield call(...args);
  } catch (error: any) {
    console.log('API CALL PROXY');
    console.log('===Error: ', error);
    if (error?.status === 403) {
      yield put(logoutAction());
    }
    throw error;
  }
}
