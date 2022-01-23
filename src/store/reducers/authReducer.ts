import {AnyAction} from 'redux';

export type User = {
  userId: string;
  index: string;
  fullName: string;
  phoneNumber: string;
  token: string;
};

export type AuthState = {
  userData?: User;
};

const initState: AuthState = {};

// reducer
export default function authReducer(
  state = initState,
  action: AnyAction,
): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
}
