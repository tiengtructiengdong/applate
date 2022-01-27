import {AnyAction} from 'redux';

export type AuthState = {
  userId?: string;
  id?: string;
  fullName?: string;
  phoneNumber?: string;
  token?: string;
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
        ...action.userData,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        userId: undefined,
        id: undefined,
        fullName: undefined,
        phoneNumber: undefined,
        token: undefined,
      };
    default:
      return state;
  }
}
