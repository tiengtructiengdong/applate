import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {AuthState} from '@store/reducers/authReducer';

//checkin/checkout

export function testCheckin(auth: AuthState, id: number, plateId: string) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/testCheckin`, {
    plateId,
  });
}

export function checkin(
  auth: AuthState,
  id: number,
  plateId: string,
  code: string,
) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/checkin`, {
    plateId,
    code,
  });
}

export function testCheckout(auth: AuthState, id: number, code: string) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/testCheckout`, {
    code,
  });
}

export function checkout(auth: AuthState, id: number, plateId: string) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/checkout`, {
    plateId,
  });
}

export function setMembership(
  auth: AuthState,
  id: number,
  plateId: string,
  membershipId: number,
) {
  return new apiClient(auth).put(
    `${HOST}parkingLot/${id}/customer/${plateId}/setMembership`,
    {
      membershipId,
    },
  );
}
