import {AnyAction} from 'redux';
import def from 'react-native-default-preference';

export type AuthState = {
  officialId?: string;
  id?: string;
  fullName?: string;
  phoneNumber?: string;
  token?: string;
  navigation?: any;
};

const initState: AuthState = {};

// reducer
export default function authReducer(
  state = initState,
  action: AnyAction,
): AuthState {
  switch (action.type) {
    case 'SET_TAB_NAVIGATION':
      return {
        ...state,
        navigation: action.navigation,
      };
    case 'LOGIN_SUCCESS':
      def.set('id', `${action.userData.id}`).then(() => {
        def.set('token', action.userData.token).then(() => {});
      });

      const {officialId, id, fullName, phoneNumber, token} = action.userData;
      return {...state, officialId, id, fullName, phoneNumber, token};

    case 'LOGOUT_SUCCESS':
      def.clear('id').then(() => {
        def.clear('token').then(() => {});
      });

      return {
        ...state,
        officialId: undefined,
        id: undefined,
        fullName: undefined,
        phoneNumber: undefined,
        token: undefined,
      };
    default:
      return state;
  }
}
