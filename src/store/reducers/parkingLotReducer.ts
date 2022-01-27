import {AnyAction} from 'redux';

export type ParkingLot = {};

export type ParkingLotState = {
  myParkingLot: ParkingLot[];
  workingParkingLot: ParkingLot[];
  currentParkingLot?: ParkingLot;
};

const initState: ParkingLotState = {
  myParkingLot: [],
  workingParkingLot: [],
};

// reducer
export default function parkingLotReducer(
  state = initState,
  action: AnyAction,
): ParkingLotState {
  switch (action.type) {
    case 'GET_ALL_PARKING_LOTS_SUCCESS':
      const {myParkingLot, workingParkingLot} = action.parkingLotData;
      return {
        ...state,
        myParkingLot,
        workingParkingLot,
        currentParkingLot: myParkingLot
          ? myParkingLot[0]
          : workingParkingLot
          ? workingParkingLot[0]
          : undefined,
      };

    default:
      return state;
  }
}
