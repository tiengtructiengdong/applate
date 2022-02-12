import {
  getActiveSessionSuccessAction,
  getAllParkingLotsAction,
  getAllParkingLotsSuccessAction,
  getParkSuccessAction,
  getPartnerAction,
  getPartnerSuccessAction,
  searchUserSuccessAction,
} from '@store/actionTypes';
import {AnyAction} from 'redux';
import {put, takeLatest, all, call, select} from 'typed-redux-saga';
import {apiCallProxy} from './apiHelper';
import {parseRawDataResponse, popUp} from '@constants/Utils';
import {
  addParkingLot,
  getAllParkingLots,
  getActiveSession,
  searchVehicle,
  searchUser,
  addPartner,
  getPark,
  getPartner,
  deletePartner,
} from '@services/parkingLotServices';
import {authSelector} from '@store/selectors/authSelector';

const addParkingLotSaga = function* (action: AnyAction) {
  const {address, name, spaceCount} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(
      addParkingLot,
      auth,
      address,
      name,
      spaceCount,
    );
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getAllParkingLotsAction());
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

const getAllParkingLotsSaga = function* (action: AnyAction) {
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(getAllParkingLots, auth);
    const data = parseRawDataResponse(response, true);
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

const getActiveSessionSaga = function* (action: AnyAction) {
  const {id} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(getActiveSession, auth, id);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getActiveSessionSuccessAction(data.session));
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

const searchVehicleSaga = function* (action: AnyAction) {
  const {id, keyword} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(searchVehicle, auth, id, keyword);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getActiveSessionSuccessAction(data.vehicles));
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

const searchUserSaga = function* (action: AnyAction) {
  const {keyword} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(searchUser, auth, keyword);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(searchUserSuccessAction(data.users));
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

const getParkSaga = function* (action: AnyAction) {
  const {id} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(getPark, auth, id);
    const data = parseRawDataResponse(response, true);
    if (data) {
      const {parkingLot, membership} = data;
      yield* put(getParkSuccessAction(parkingLot, membership));
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

const getPartnerSaga = function* (action: AnyAction) {
  const {id} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(getPartner, auth, id);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getPartnerSuccessAction(data.data));
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

const addPartnerSaga = function* (action: AnyAction) {
  const {id, partnerId} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(addPartner, auth, id, partnerId);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getPartnerAction(id));
      //if (data.message === 'Successful') {
      //  popUp('Successful!', 'They are now your partners.');
      //}
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

const deletePartnerSaga = function* (action: AnyAction) {
  const {id, partnerId} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(deletePartner, auth, id, partnerId);
    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getPartnerAction(id));
      //if (data.message === 'Successful') {
      //  popUp('Successful!', 'They are now your partners.');
      //}
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
    takeLatest('GET_ALL_PARKING_LOTS', getAllParkingLotsSaga),
    takeLatest('ADD_PARKING_LOT', addParkingLotSaga),
    takeLatest('GET_ACTIVE_SESSION', getActiveSessionSaga),
    takeLatest('SEARCH_VEHICLE', searchVehicleSaga),
    takeLatest('SEARCH_USER', searchUserSaga),
    takeLatest('ADD_PARTNER', addPartnerSaga),
    takeLatest('GET_PARK', getParkSaga),
    takeLatest('GET_PARTNER', getPartnerSaga),
    takeLatest('DELETE_PARTNER', deletePartnerSaga),
  ]);
}
