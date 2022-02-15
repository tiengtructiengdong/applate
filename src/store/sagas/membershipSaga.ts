import {
  checkinSuccessAction,
  getActiveSessionAction,
  getParkAction,
  testCheckoutFailedAction,
  testCheckoutSuccessAction,
} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';
import {authSelector} from '@store/selectors/authSelector';
import {
  addMembership,
  deleteMembership,
  updateMembership,
} from '@services/membershipServices';

const addMembershipSaga = function* (action: AnyAction) {
  const {id, membership} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(addMembership, auth, id, membership);
    console.log(response);
    if (response.status != 200) {
      throw new Error('Cannot add membership');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getParkAction(id));
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

const updateMembershipSaga = function* (action: AnyAction) {
  const {id, membershipId, update} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(
      updateMembership,
      auth,
      id,
      membershipId,
      update,
    );
    if (response.status != 200) {
      throw new Error('Cannot update membership');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(checkinSuccessAction(data));
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

const deleteMembershipSaga = function* (action: AnyAction) {
  const {id, membershipId} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(deleteMembership, auth, id, membershipId);
    console.log(response);
    if (response.status != 200) {
      throw new Error('Cannot add membership');
    }
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getParkAction(id));
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
    takeLatest('ADD_MEMBERSHIP', addMembershipSaga),
    takeLatest('UPDATE_MEMBERSHIP', updateMembershipSaga),
    takeLatest('DELETE_MEMBERSHIP', deleteMembershipSaga),
  ]);
}
