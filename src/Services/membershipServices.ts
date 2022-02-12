import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {AuthState} from '@store/reducers/authReducer';

//checkin/checkout

export type Fee = {
  price: number;
};

export type Membership = {
  name?: string;
  fee?: Fee;
  level?: number;
};

export function addMembership(
  auth: AuthState,
  id: number,
  membership: Membership,
) {
  return new apiClient(auth).post(
    `${HOST}parkingLot/${id}/addMembership`,
    membership,
  );
}

export function updateMembership(
  auth: AuthState,
  id: number,
  membershipId: number,
  update: Membership,
) {
  return new apiClient(auth).put(
    `${HOST}parkingLot/${id}/membership/${membershipId}/addMembership`,
    update,
  );
}
