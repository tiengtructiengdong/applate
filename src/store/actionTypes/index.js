// AUTH
export const loginAction = makeAction('LOGIN', 'number', 'password');
export const loginSuccessAction = makeAction('LOGIN_SUCCESS', 'userData');

export const logoutAction = makeAction('LOGOUT');
export const logoutSuccessAction = makeAction('LOGOUT_SUCCESS');

export const registerAction = makeAction('REGISTER');
export const registerSuccessAction = makeAction('REGISTER_SUCCESS');

export const getAppStateAction = makeAction('GET_APP_STATE');
export const getAppStateSuccessAction = makeAction(
  'GET_APP_STATE_SUCCESS',
  'isLoggedIn',
  'userData',
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
