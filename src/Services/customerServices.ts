import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {AuthState} from '@store/reducers/authReducer';

//checkin/checkout

export function checkin(auth: AuthState, id: number, plateId: string) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/checkin`, {plateId});
}

export function testCheckout(auth: AuthState, id: number, code: string) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/testCheckout`, {
    code,
  });
}

export function checkout(auth: AuthState, id: number, code: string) {
  return new apiClient(auth).post(`${HOST}parkingLot/${id}/checkout`, {
    code,
  });
}
