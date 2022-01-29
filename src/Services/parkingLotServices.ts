import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {AuthState} from '@store/reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '@store/selectors/authSelector';
import {Fee} from '@constants/Types';

// add

export function addParkingLot(
  auth: AuthState,
  address?: string,
  name?: string,
  spaceCount?: number,
) {
  return new apiClient(auth).post(`${HOST}parkingLot/addParkingLot`, {
    address,
    name,
    spaceCount,
  });
}

export function addMembership(
  auth: AuthState,
  id: number,
  name?: string,
  fee?: Fee,
  level: number = 0,
) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/addParkingLot`, {
    name,
    fee,
    level,
  });
}

export function getAllParkingLots(auth: AuthState) {
  return new apiClient(auth).get(`${HOST}parkingLot`);
}

export function getActiveSession(auth: AuthState, id: number) {
  return new apiClient(auth).get(`${HOST}parkingLot/${id}/getActiveSession`);
}
