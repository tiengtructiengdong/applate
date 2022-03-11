import {
  checkinSuccessAction,
  getActiveSessionAction,
  logoutSuccessAction,
  testCheckinProceedAction,
  testCheckoutFailedAction,
  testCheckoutSuccessAction,
} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';
import {authSelector} from '@store/selectors/authSelector';
import {
  printTicketSelector,
  onTestCheckinSuccessSelector,
} from '@store/selectors/customerSelector';
import {
  checkin,
  checkout,
  setMembership,
  testCheckin,
  testCheckout,
} from '@services/customerServices';

const testCheckinSaga = function* (action: AnyAction) {
  const {id, plateId} = action;
  console.log(action);
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(testCheckin, auth, id, plateId);

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

    if (response.status != 200) {
      console.log(response);
      throw new Error('Test checkin error');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(testCheckinProceedAction(data));
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

const testCheckinProceedSaga = function* (action: AnyAction) {
  //const {id, plateId, code} = action;
  try {
    const printTicket = yield* select(state => printTicketSelector(state));
    const onTestCheckinSuccess = yield* select(state =>
      onTestCheckinSuccessSelector(state),
    );

    if (printTicket) {
      try {
        printTicket(action.data);
      } catch (err) {
        popUp(err.message);
        return;
      }
    }
    if (onTestCheckinSuccess) {
      onTestCheckinSuccess(action.data);
    }
  } catch (error: any) {
    popUp(error.message);
  } finally {
    //yield* put(updateSessionAction({loading: false}));
  }
};

const checkinSaga = function* (action: AnyAction) {
  const {id, plateId, code} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(checkin, auth, id, plateId, code);

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

    if (response.status != 200) {
      throw new Error('Checkout error');
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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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
    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

    if (response.status != 200) {
      throw new Error('Error setting membership');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      //yield* put(checkinSuccessAction(data));
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

export default function* () {
  yield* all([
    takeLatest('TEST_CHECKIN', testCheckinSaga),
    takeLatest('TEST_CHECKIN_PROCEED', testCheckinProceedSaga),
    takeLatest('CHECKIN', checkinSaga),
    takeLatest('TEST_CHECKOUT', testCheckoutSaga),
    takeLatest('CHECKOUT', checkoutSaga),
    takeLatest('SET_MEMBERSHIP', setMembershipSaga),
  ]);
}
