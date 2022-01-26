// AUTH
export const loginAction = makeAction('LOGIN', 'number', 'password');
export const loginSuccessAction = makeAction('LOGIN_SUCCESS', 'userData');

export const logoutAction = makeAction('LOGOUT');
export const logoutSuccessAction = makeAction('LOGOUT_SUCCESS');

export const registerAction = makeAction('REGISTER', 'registerData');
export const registerSuccessAction = makeAction('REGISTER_SUCCESS');

// PARKING LOT
export const getAllParkingLotsAction = makeAction('GET_ALL_PARKING_LOTS');
export const getAllParkingLotsSuccessAction = makeAction(
  'GET_ALL_PARKING_LOTS_SUCCESS',
  'parkingLotData',
);

// makeAction
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////

function makeAction(type, ...argNames) {
  return function (...args) {
    const action = {type};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}
