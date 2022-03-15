import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {tokenSelector} from '@store/selectors/authSelector';
import MainStack from '@components/MainStack';
import AuthStack from '@components/AuthStack';
import def from 'react-native-default-preference';
import {
  loginSuccessAction,
  resetBluetoothPrinterAction,
  setBluetoothPrinterAction,
} from '@store/actionTypes';
import styled from 'styled-components';

import BleManager, {start} from 'react-native-ble-manager';

const Blank = styled.View`
  height: 100%;
  width: 100%;
  background-color: #121212;
`;

const RootStack = ({}) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const [isGetDef, setGetDef] = useState(false);

  const getDef = async () => {
    BleManager.start({showAlert: true});
    try {
      const idStr = await def.get('id');
      const token = await def.get('token');
      const fullName = await def.get('fullName');
      const officialId = await def.get('officialId');
      const phoneNumber = await def.get('phoneNumber');

      if (idStr === undefined || token === undefined) {
        throw new Error('You must log in first.');
      }

      const id = parseInt(idStr);
      dispatch(
        loginSuccessAction({id, token, fullName, officialId, phoneNumber}),
      );
      const bluetoothPrinterId = await def.get('bluetoothPrinter');
      await BleManager.connect(bluetoothPrinterId);
      const info = await BleManager.retrieveServices(bluetoothPrinterId);
      console.log('success', info);

      dispatch(setBluetoothPrinterAction({id: bluetoothPrinterId}));
      setGetDef(true);
    } catch (err) {
      console.log('Invalid Bluetooth', err);
      dispatch(resetBluetoothPrinterAction());
      setGetDef(true);
    }
  };

  useEffect(() => {
    getDef();
  }, [dispatch]);

  if (!isGetDef) {
    return <Blank />;
  }

  return token != null && token != undefined && token != '' ? (
    <MainStack />
  ) : (
    <AuthStack />
  );
};

export default React.memo(RootStack);
