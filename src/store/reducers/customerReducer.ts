import {AnyAction} from 'redux';

export type CustomerState = {
  onCheckinSuccess?: (data: any) => void;
  onTestCheckoutSuccess?: (plateId: string) => void;
  onTestCheckoutFailed?: () => void;
};

const initState: CustomerState = {};

// reducer
export default function customerReducer(
  state = initState,
  action: AnyAction,
): CustomerState {
  switch (action.type) {
    case 'SETUP_CUSTOMER_LISTENER':
      const {onCheckinSuccess, onTestCheckoutSuccess, onTestCheckoutFailed} =
        action;
      return {
        ...state,
        onCheckinSuccess,
        onTestCheckoutSuccess,
        onTestCheckoutFailed,
      };
    case 'CHECKIN_SUCCESS':
      if (state.onCheckinSuccess) state.onCheckinSuccess(action.data);
      return state;
    case 'TEST_CHECKOUT_SUCCESS':
      if (state.onTestCheckoutSuccess)
        state.onTestCheckoutSuccess(action.plateId);
      return state;
    case 'TEST_CHECKOUT_FAILED':
      if (state.onTestCheckoutFailed) state.onTestCheckoutFailed();
      return state;

    default:
      return state;
  }
}
