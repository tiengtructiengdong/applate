import {RootState} from '@store/index';

export const myParkingLotSelector = (state: RootState) =>
  state.parkingLot?.myParkingLot || [];

export const workingParkingLotSelector = (state: RootState) =>
  state.parkingLot?.workingParkingLot || [];

export const currentParkingLotSelector = (state: RootState) =>
  state.parkingLot?.currentParkingLot;
