import {RootState} from '@store/index';

export const bluetoothPrinterSelector = (state: RootState) =>
  state.settings?.bluetoothPrinter;

export const isBluetoothPrinterConnectedSelector = (state: RootState) =>
  state.settings?.isBluetoothPrinterConnected || false;
