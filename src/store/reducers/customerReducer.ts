import {printTicket} from '@constants/Utils';
import {AnyAction} from 'redux';

export type CustomerState = {
  onTestCheckinSuccess?: (data: any) => void;
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
      const {
        onTestCheckinSuccess,
        onCheckinSuccess,
        onTestCheckoutSuccess,
        onTestCheckoutFailed,
      } = action;
      return {
        ...state,
        onTestCheckinSuccess,
        onCheckinSuccess,
        onTestCheckoutSuccess,
        onTestCheckoutFailed,
      };

    case 'TEST_CHECKIN_SUCCESS':
      printTicket(action.data)
        .then(() => {
          if (state.onTestCheckinSuccess)
            state.onTestCheckinSuccess(action.data);
        })
        .catch(() => {});
      return state;

    case 'CHECKIN_SUCCESS':
      console.log('Checkin success');
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
