import {combineReducers} from 'redux';

import authReducer from './authReducer';
import customerReducer from './customerReducer';
import membershipReducer from './membershipReducer';
import parkingLotReducer from './parkingLotReducer';

const reducer = combineReducers({
  auth: authReducer,
  parkingLot: parkingLotReducer,
  customer: customerReducer,
  membership: membershipReducer,
});

export default reducer;
