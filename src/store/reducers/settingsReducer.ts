import {AnyAction} from 'redux';
import def from 'react-native-default-preference';

export type SettingsState = {
  bluetoothPrinter: string;
  isBluetoothPrinterConnected: boolean;
};

const initState: SettingsState = {
  bluetoothPrinter: '',
  isBluetoothPrinterConnected: false,
};

// reducer
export default function settingsReducer(
  state = initState,
  action: AnyAction,
): SettingsState {
  switch (action.type) {
    case 'SET_BLUETOOTH_PRINTER':
      def.set('bluetoothPrinter', action.printer.id).then(() => {});
      console.log('set', action.printer.id);
      return {
        ...state,
        bluetoothPrinter: action.printer.id,
        isBluetoothPrinterConnected: true,
      };
    case 'RESET_BLUETOOTH_PRINTER':
      def.clear('bluetoothPrinter').then(() => {});
      //console.log('reset ble');
      return {
        ...state,
        //bluetoothPrinter: '',
        isBluetoothPrinterConnected: false,
      };
    default:
      return state;
  }
}
