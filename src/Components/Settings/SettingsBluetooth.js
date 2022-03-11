import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import styled from 'styled-components';
import {Header} from '@components/Header';

import BleManager, {start} from 'react-native-ble-manager';

import {NativeEventEmitter, NativeModules} from 'react-native';
import EscPosEncoder from 'esc-pos-encoder';

import qrcode from 'qrcode-terminal';
import {useDispatch} from 'react-redux';
import {sleep} from '@constants/Utils';

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
const YellowLabel = styled(Label)`
  font-size: 14px;
  color: #ffb500;
  font-weight: 400;
  padding-bottom: 15px;
`;
const Scroll = styled.ScrollView`
  margin-bottom: 70px;
`;
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

  const [isScanned, setIsScanned] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const peripherals = new Map();
  const [list, setList] = useState([]);

  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const dispatch = useDispatch();

  const startScan = () => {
    if (!isScanned) {
      setLoading(true);
      BleManager.scan([], 5, false)
        .then(results => {
          setIsScanned(true);
          console.log('Scanning...');
        })
        .catch(err => {
          console.error(err);
        });
      sleep(5000).then(() => {
        BleManager.stopScan();
        setLoading(false);
      });
    }
  };

  const printTest = peripheral => {
    const encoder = new EscPosEncoder();
    const res = encoder
      .initialize()
      .text('Applate Test')
      .newline()
      .newline()
      .text('Printer test success!')
      .newline()
      .text('You can now use the app.')
      .newline()
      .newline()
      .newline()
      .encode();
    var newArr = [];
    for (i in res) {
      newArr[i] = res[i] & 0xff;
    }
    console.log('allow', newArr);

    BleManager.retrieveServices(peripheral.id)
      .then(peripheralInfo => {
        var service = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
        var characteristic = '49535343-8841-43f4-a8d4-ecbe34729bb3';
        console.log(peripheralInfo);
        BleManager.write(peripheral.id, service, characteristic, newArr)
          .then(() => {
            console.log('Writed NORMAL crust');
          })
          .catch(err => {
            console.log('yeetfail');
          });
      })
      .catch(err => {
        console.log('nope', err);
      });
  };

  const handleStopScan = () => {
    console.log('Scan is stopped');
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

  const handleDiscoverPeripheral = peripheral => {
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      //peripheral.name = 'NO NAME';
      return;
    }
    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
  };

  const testPeripheral = peripheral => {
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
                      console.log(p);
                      setList(Array.from(peripherals.values()));
                    }
                  });
                },
              );
              printTest(peripheral);
            }, 900);
          })
          .catch(error => {
            console.log('Connection error', error);
          });
      }
    }
  };

  useEffect(() => {
    BleManager.start({showAlert: true});

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

  //
  //
  //
  //
  //
  //

  //
  //
  //
  //
  //

  const renderItem = item => {
    return (
      <Item onPress={() => testPeripheral(item)}>
        <Label>{item.name}</Label>
        <Sublabel>RSSI: {item.rssi}</Sublabel>
        <Sublabel>UUID: {item.id}</Sublabel>
      </Item>
    );
  };
  //if (!isScanned) {
  sleep(1000).then(() => {
    console.log('232');
    startScan();
  });
  //}

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Test Bluetooth printer`}
        isLoading={isLoading}
        goBack={() => navigation.goBack()}
        //goRight={() => startScan()}
      />
      <FieldArea>
        <WhiteLabel>
          Upon Bluetooth connection, a print test will be performed.{'\n\n'}
          <YellowLabel>
            You should only start checkin IF THE TEST PAPER SUCCESSFULLY PRINTS
            OUT.
          </YellowLabel>
        </WhiteLabel>

        <Scroll>{list.map(renderItem)}</Scroll>
      </FieldArea>
    </Container>
  );
};

export default React.memo(Screen);
