import {AnyAction} from 'redux';

export type SettingsState = {
  bluetoothPrinter?: any;
};

const initState: SettingsState = {};

// reducer
export default function settingsReducer(
  state = initState,
  action: AnyAction,
): SettingsState {
  switch (action.type) {
    case 'SET_BLUETOOTH_PRINTER':
      return {
        ...state,
        bluetoothPrinter: action.printer,
      };
    case 'RESET_BLUETOOTH_PRINTER':
      return {
        ...state,
        bluetoothPrinter: undefined,
      };
    default:
      return state;
  }
}
