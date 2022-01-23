function makeAction(type, ...argNames) {
  return function (...args) {
    const action = {type};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

// LOGIN
export const LoginAction = makeAction('LOGIN', 'number', 'password');
export const LoginSuccessAction = makeAction('LOGIN_SUCCESS', 'userData');

export const GetAppStateAction = makeAction('GET_APP_STATE');
export const GetAppStateSuccessAction = makeAction(
  'GET_APP_STATE_SUCCESS',
  'isLoggedIn',
  'userData',
);
