import {
  getActiveSessionAction,
  getActiveSessionSuccessAction,
  getAllParkingLotsAction,
  getAllParkingLotsSuccessAction,
  getParkAction,
  getParkSuccessAction,
  getPartnerAction,
  getPartnerSuccessAction,
  logoutSuccessAction,
  searchVehicleSuccessAction,
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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(getAllParkingLotsSuccessAction(data));

      const {myParkingLot, workingParkingLot} = data;
      const currentPark =
        myParkingLot && myParkingLot.length > 0
          ? myParkingLot[0]
          : workingParkingLot && workingParkingLot.length > 0
          ? workingParkingLot[0]
          : undefined;

      if (currentPark) {
        yield* put(getParkAction(currentPark.Id));
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

const getActiveSessionSaga = function* (action: AnyAction) {
  const {id} = action;
  try {
    //yield* put(updateSessionAction({loading: true}));
    const auth = yield* select(state => authSelector(state));
    const response = yield* call(getActiveSession, auth, id);

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

    const data = parseRawDataResponse(response, true);
    if (data) {
      yield* put(searchVehicleSuccessAction(data.vehicles));
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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

    const data = parseRawDataResponse(response, true);
    if (data) {
      const {parkingLot, membership} = data;
      console.log(membership);
      yield* put(getParkSuccessAction(parkingLot, membership));
      yield* put(getActiveSessionAction(parkingLot.Id));
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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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

    if (response.status == 403) {
      yield* put(logoutSuccessAction());
      throw new Error('Please log in again.');
    }

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
