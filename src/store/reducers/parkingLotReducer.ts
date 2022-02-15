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
  membership: any[];
  partner: any[];
  isMyPark: boolean;
  vehicleCount?: number;
};

const initState: ParkingLotState = {
  myParkingLot: [],
  workingParkingLot: [],
  session: [],
  searchUser: [],
  membership: [],
  partner: [],
  isMyPark: false,
  vehicleCount: 0,
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
      };
    case 'GET_ACTIVE_SESSION_SUCCESS':
      return {
        ...state,
        session: action.customerData,
        vehicleCount: action.customerData?.length || 0,
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
        membership: action.membership,
        isMyPark: state.myParkingLot
          .map(x => x.Id)
          .includes(action.parkingLot.Id),
      };
    case 'GET_PARTNER_SUCCESS':
      return {
        ...state,
        partner: action.partners,
      };

    default:
      return state;
  }
}
