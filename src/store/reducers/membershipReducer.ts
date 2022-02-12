import {AnyAction} from 'redux';

export type MembershipState = {};

const initState: MembershipState = {};

// reducer
export default function membershipReducer(
  state = initState,
  action: AnyAction,
): MembershipState {
  switch (action.type) {
    default:
      return state;
  }
}
