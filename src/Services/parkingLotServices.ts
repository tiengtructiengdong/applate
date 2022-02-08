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

export function getPark(auth: AuthState, id: number) {
  return new apiClient(auth).get(`${HOST}parkingLot/${id}`);
}

export function getActiveSession(auth: AuthState, id: number) {
  return new apiClient(auth).get(`${HOST}parkingLot/${id}/getActiveSession`);
}

export function searchVehicle(auth: AuthState, id: number, keyword: string) {
  return new apiClient(auth).get(
    `${HOST}parkingLot/${id}/searchVehicle?keyword=${keyword}`,
  );
}

export function searchUser(auth: AuthState, keyword: string) {
  return new apiClient(auth).get(`${HOST}searchUser?keyword=${keyword}`);
}

export function addPartner(auth: AuthState, id: number, partnerId: number) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/addPartner`, {
    partnerId,
  });
}

export function getPartner(auth: AuthState, id: number) {
  return new apiClient(auth).get(`${HOST}parkingLot/${id}/getPartner`);
}

export function deletePartner(auth: AuthState, id: number, partnerId: number) {
  return new apiClient(auth).delete(`${HOST}parkingLot/${id}/deletePartner`, {
    partnerId,
  });
}
