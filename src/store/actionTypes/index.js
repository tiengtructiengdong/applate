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

export const addPartnerAction = makeAction('ADD_PARTNER', 'partnerId');
export const addPartnerSuccessAction = makeAction('ADD_PARTNER_SUCCESS');
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
