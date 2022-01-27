import {combineReducers} from 'redux';

import authReducer from './authReducer';
import parkingLotReducer from './parkingLotReducer';

const reducer = combineReducers({
  auth: authReducer,
  parkingLot: parkingLotReducer,
});

export default reducer;
