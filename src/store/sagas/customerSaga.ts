import {
  checkinSuccessAction,
  getActiveSessionAction,
  testCheckoutFailedAction,
  testCheckoutSuccessAction,
} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';
import {authSelector} from '@store/selectors/authSelector';
import {
  checkin,
  checkout,
  setMembership,
  testCheckout,
} from '@services/customerServices';

const checkinSaga = function* (action: AnyAction) {
  const {id, plateId} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(checkin, auth, id, plateId);
    if (response.status != 200) {
      throw new Error('Checkin error');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(checkinSuccessAction(data));
      yield* put(getActiveSessionAction(id));
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

const checkoutSaga = function* (action: AnyAction) {
  const {id, plateId} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(checkout, auth, id, plateId);
    if (response.status != 200) {
      throw new Error('Checkin error');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getActiveSessionAction(id));
      //yield* put(checkinSuccessAction(data));
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

const testCheckoutSaga = function* (action: AnyAction) {
  const {id, code} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(testCheckout, auth, id, code);
    if (response.status != 200) {
      yield* put(testCheckoutFailedAction());
      return;
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      if (data.isFound) {
        yield* put(testCheckoutSuccessAction(data.plateId));
      } else {
        yield* put(testCheckoutFailedAction());
      }
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

const setMembershipSaga = function* (action: AnyAction) {
  const {id, plateId, membershipId} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(
      setMembership,
      auth,
      id,
      plateId,
      membershipId,
    );
    if (response.status != 200) {
      throw new Error('Error setting membership');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      //yield* put(checkinSuccessAction(data));
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
    takeLatest('CHECKIN', checkinSaga),
    takeLatest('TEST_CHECKOUT', testCheckoutSaga),
    takeLatest('CHECKOUT', checkoutSaga),
    takeLatest('SET_MEMBERSHIP', setMembershipSaga),
  ]);
}
