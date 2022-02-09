// AUTH
export const loginAction = makeAction('LOGIN', 'number', 'password');
export const loginSuccessAction = makeAction('LOGIN_SUCCESS', 'userData');

export const logoutAction = makeAction('LOGOUT', 'id');
export const logoutSuccessAction = makeAction('LOGOUT_SUCCESS');

export const registerAction = makeAction('REGISTER', 'registerData');
export const registerSuccessAction = makeAction('REGISTER_SUCCESS');

// PARKING LOT
export const addParkingLotAction = makeAction(
  'ADD_PARKING_LOT',
  'address',
  'name',
  'spaceCount',
);
export const addParkingLotSuccessAction = makeAction('ADD_PARKING_LOT_SUCCESS');

export const getAllParkingLotsAction = makeAction('GET_ALL_PARKING_LOTS');
export const getAllParkingLotsSuccessAction = makeAction(
  'GET_ALL_PARKING_LOTS_SUCCESS',
  'parkingLotData',
);

export const getActiveSessionAction = makeAction('GET_ACTIVE_SESSION', 'id');
export const getActiveSessionSuccessAction = makeAction(
  'GET_ACTIVE_SESSION_SUCCESS',
  'customerData',
);

export const searchVehicleAction = makeAction(
  'SEARCH_VEHICLE',
  'id',
  'keyword',
);
export const searchVehicleSuccessAction = makeAction(
  'SEARCH_VEHICLE_SUCCESS',
  'vehicles',
);

export const searchUserAction = makeAction('SEARCH_USER', 'keyword');
export const searchUserSuccessAction = makeAction(
  'SEARCH_USER_SUCCESS',
  'users',
);

export const getParkAction = makeAction('GET_PARK', 'id');
export const getParkSuccessAction = makeAction(
  'GET_PARK_SUCCESS',
  'parkingLot',
);

export const getPartnerAction = makeAction('GET_PARTNER', 'id');
export const getPartnerSuccessAction = makeAction(
  'GET_PARTNER_SUCCESS',
  'partners',
);

export const addPartnerAction = makeAction('ADD_PARTNER', 'id', 'partnerId');
export const addPartnerSuccessAction = makeAction('ADD_PARTNER_SUCCESS');

export const deletePartnerAction = makeAction(
  'DELETE_PARTNER',
  'id',
  'partnerId',
);
export const deletePartnerSuccessAction = makeAction('DELETE_PARTNER_SUCCESS');

export const setupCustomerListenerAction = makeAction(
  'SETUP_CUSTOMER_LISTENER',
  'onCheckinSuccess',
  'onTestCheckoutSuccess',
  'onTestCheckoutFailed',
);

export const checkinAction = makeAction('CHECKIN', 'id', 'plateId');
export const checkinSuccessAction = makeAction('CHECKIN_SUCCESS', 'data');

export const checkoutAction = makeAction('CHECKOUT', 'id', 'code');
export const checkoutSuccessAction = makeAction('CHECKOUT_SUCCESS');

export const testCheckoutAction = makeAction('TEST_CHECKOUT', 'id', 'code');
export const testCheckoutSuccessAction = makeAction(
  'TEST_CHECKOUT_SUCCESS',
  'plateId',
);
export const testCheckoutFailedAction = makeAction('TEST_CHECKOUT_FAILED');
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// makeAction

function makeAction(type, ...argNames) {
  return function (...args) {
    const action = {type};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}
