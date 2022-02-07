import {AnyAction} from 'redux';

export type ParkingLot = {
  Address: string;
  Id: number;
  Name: string;
  OwnerId: number;
  SpaceCount: number;
};

export type Customer = {
  Address: string;
  Id: number;
  Name: string;
  OwnerId: number;
  SpaceCount: number;
};

export type ParkingLotState = {
  myParkingLot: ParkingLot[];
  workingParkingLot: ParkingLot[];
  currentParkingLot?: ParkingLot;
  session: any[];
  searchUser: any[];
  membership: any;
  partner: any[];
};

const initState: ParkingLotState = {
  myParkingLot: [],
  workingParkingLot: [],
  session: [],
  searchUser: [],
  membership: {},
  partner: [],
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
    case 'GET_ACTIVE_SESSION_SUCCESS':
      return {
        ...state,
        session: action.customerData,
      };
    case 'SEARCH_VEHICLE_SUCCESS':
      return {
        ...state,
        session: action.vehicles,
      };
    case 'SEARCH_USER_SUCCESS':
      return {
        ...state,
        searchUser: action.users,
      };
    case 'GET_PARK_SUCCESS':
      return {
        ...state,
        currentParkingLot: action.parkingLot,
        membership: action.parkingLot.membership,
      };

    default:
      return state;
  }
}
