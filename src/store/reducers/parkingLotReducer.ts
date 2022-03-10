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
  page: number;
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
  page: 1,
};

// reducer
export default function parkingLotReducer(
  state = initState,
  action: AnyAction,
): ParkingLotState {
  switch (action.type) {
    case 'RESET_PARKS':
      return {
        ...state,
        myParkingLot: [],
        workingParkingLot: [],
        session: [],
        searchUser: [],
        membership: [],
        partner: [],
        isMyPark: false,
        vehicleCount: 0,
        page: 1,
      };
    case 'GET_ALL_PARKING_LOTS_SUCCESS':
      const {myParkingLot, workingParkingLot} = action.parkingLotData;
      return {
        ...state,
        myParkingLot,
        workingParkingLot,
        page: 1,
      };
    case 'GET_ACTIVE_SESSION_SUCCESS':
      if (action.vehicleCount) {
        return {
          ...state,
          session: action.customerData,
          vehicleCount: action.vehicleCount,
          page: 1,
        };
      }
      return {
        ...state,
        session: (state.session || []).concat(action.customerData),
        page: state.page + 1,
      };
    case 'SEARCH_VEHICLE_SUCCESS':
      return {
        ...state,
        session: action.vehicles,
        page: 1,
      };
    case 'SEARCH_USER_SUCCESS':
      return {
        ...state,
        searchUser: action.users,
        page: 1,
      };
    case 'GET_PARK_SUCCESS':
      return {
        ...state,
        page: 1,
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
