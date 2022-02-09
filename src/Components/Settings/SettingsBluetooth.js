import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import BleManager, {start} from 'react-native-ble-manager';

import {NativeEventEmitter, NativeModules} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {popUp} from '@constants/Utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #ffb500;
`;
const FieldArea = styled.View`
  align-self: center;
  flex: 1;
  width: 100%;
  padding-top: 35px;
  margin-bottom: -50px;
  background-color: #121212;
`;
const Label = styled.Text`
  font-size: 16px;
  margin-horizontal: 40px;
  color: #ffb500;
  font-weight: 700;
`;
const WhiteLabel = styled(Label)`
  font-size: 14px;
  color: white;
  font-weight: 400;
  padding-bottom: 15px;
`;
const Scroll = styled.ScrollView``;
const Sublabel = styled.Text`
  font-size: 8px;
  margin-horizontal: 40px;
  color: white;
`;
const Item = styled.TouchableOpacity`
  padding-vertical: 10px;
`;

const Screen = ({}) => {
  const navigation = useNavigation();

  const [isScanning, setIsScanning] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 3, true)
        .then(results => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      BleManager.stopScan();
    }
  };

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
  };

  const handleDisconnectedPeripheral = data => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  };

  const handleUpdateValueForCharacteristic = data => {
    console.log(
      'Received data from ' +
        data.peripheral +
        ' characteristic ' +
        data.characteristic,
      data.value,
    );
  };

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  };

  const handleDiscoverPeripheral = peripheral => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  const testPeripheral = peripheral => {
    console.log('we');
    if (peripheral) {
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id);
      } else {
        BleManager.connect(peripheral.id)
          .then(() => {
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              setList(Array.from(peripherals.values()));
            }
            console.log('Connected to ' + peripheral.id);

            setTimeout(() => {
              /* Test read current RSSI value */
              BleManager.retrieveServices(peripheral.id).then(
                peripheralData => {
                  console.log('Retrieved peripheral services', peripheralData);

                  BleManager.readRSSI(peripheral.id).then(rssi => {
                    console.log('Retrieved actual RSSI value', rssi);
                    let p = peripherals.get(peripheral.id);
                    if (p) {
                      p.rssi = rssi;
                      peripherals.set(peripheral.id, p);
                      setList(Array.from(peripherals.values()));
                    }
                  });
                },
              );
            }, 900);
          })
          .catch(error => {
            console.log('Connection error', error);
          });
      }
    }
  };

  useEffect(() => {
    BleManager.start({showAlert: false});

    bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }

    return () => {
      console.log('unmount');
      bleManagerEmitter.removeListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      );
      bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
      bleManagerEmitter.removeListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      );
      bleManagerEmitter.removeListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      );
    };
  }, []);

  const renderItem = item => {
    return (
      <Item onPress={() => testPeripheral(item)}>
        <Label>{item.name}</Label>
        <Sublabel>RSSI: {item.rssi}</Sublabel>
        <Sublabel>UUID: {item.id}</Sublabel>
      </Item>
    );
  };

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Didn't find your printers?`}
        goBack={() => navigation.goBack()}
        goRight={() => startScan()}
      />
      <FieldArea>
        <WhiteLabel>
          If your device's Bluetooth setting screen doesn't include your
          printer, you can connect from here.{'\n\n'}Press Scan button to scan
          Bluetooth devices. Press it again to stop.
        </WhiteLabel>

        <Scroll>{list.map(renderItem)}</Scroll>
      </FieldArea>
    </Container>
  );
};

export default React.memo(Screen);
