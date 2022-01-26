import {AnyAction} from 'redux';

export type ParkingLot = {};

export type ParkingLotState = {
  myParkingLot: ParkingLot[];
  workingParkingLot: ParkingLot[];
};

const initState: ParkingLotState = {
  myParkingLot: [],
  workingParkingLot: [],
};

// reducer
export default function authReducer(
  state = initState,
  action: AnyAction,
): ParkingLotState {
  switch (action.type) {
    case 'GET_ALL_PARKING_LOTS_SUCCESS':
      return {
        ...state,
        ...action.parkingLotData,
      };

    default:
      return state;
  }
}
