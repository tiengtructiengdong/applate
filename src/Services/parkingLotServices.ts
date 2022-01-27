import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {AuthState} from '@store/reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '@store/selectors/authSelector';

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

export function getAllParkingLots(auth: AuthState) {
  return new apiClient(auth).get(`${HOST}parkingLot`);
}
