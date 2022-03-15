import {AnyAction} from 'redux';

export type CustomerState = {
  onTestCheckinSuccess?: (data: any) => void;
  onCheckinSuccess?: (data: any) => void;
  onTestCheckoutSuccess?: (plateId: string, price: number) => void;
  onTestCheckoutFailed?: () => void;
  printTicket?: (data: any) => Promise<void>;
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
        printTicket,
      } = action;
      console.log(action, printTicket);
      return {
        ...state,
        onTestCheckinSuccess,
        onCheckinSuccess,
        onTestCheckoutSuccess,
        onTestCheckoutFailed,
        printTicket,
      };

    case 'CHECKIN_SUCCESS':
      console.log('Checkin success');
      return state;

    case 'TEST_CHECKOUT_SUCCESS':
      if (state.onTestCheckoutSuccess)
        state.onTestCheckoutSuccess(action.plateId, action.price);
      return state;

    case 'TEST_CHECKOUT_FAILED':
      if (state.onTestCheckoutFailed) state.onTestCheckoutFailed();
      return state;

    default:
      return state;
  }
}
