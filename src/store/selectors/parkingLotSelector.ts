import {RootState} from '@store/index';

export const myParkingLotSelector = (state: RootState) =>
  state.parkingLot?.myParkingLot || [];

export const workingParkingLotSelector = (state: RootState) =>
  state.parkingLot?.workingParkingLot || [];

export const currentParkingLotSelector = (state: RootState) =>
  state.parkingLot?.currentParkingLot;

export const membershipListSelector = (state: RootState) =>
  state.parkingLot?.membership || [];

export const sessionSelector = (state: RootState) =>
  state.parkingLot?.session || [];

export const searchUserSelector = (state: RootState) =>
  state.parkingLot?.searchUser || [];

export const partnerSelector = (state: RootState) =>
  state.parkingLot?.partner || [];

export const isMyParkSelector = (state: RootState) =>
  state.parkingLot?.isMyPark || false;
