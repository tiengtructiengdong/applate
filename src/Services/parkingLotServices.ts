import {apiClient} from './Api';
import {HOST} from '@constants/Config';

import {AuthState} from '@store/reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '@store/selectors/authSelector';

// register
export function getAllParkingLots(auth: AuthState) {
  return new apiClient(auth).get(`${HOST}parkingLot`);
}
