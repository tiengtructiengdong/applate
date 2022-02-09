import {combineReducers} from 'redux';

import authReducer from './authReducer';
import customerReducer from './customerReducer';
import parkingLotReducer from './parkingLotReducer';

const reducer = combineReducers({
  auth: authReducer,
  parkingLot: parkingLotReducer,
  customer: customerReducer,
});

export default reducer;
