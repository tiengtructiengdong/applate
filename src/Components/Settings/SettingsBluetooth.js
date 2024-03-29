import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert, Platform, PermissionsAndroid} from 'react-native';

import styled from 'styled-components';
import {Header} from '@components/Header';

import BleManager, {start} from 'react-native-ble-manager';

import {NativeEventEmitter, NativeModules} from 'react-native';
import EscPosEncoder from 'esc-pos-encoder';

import qrcode from 'qrcode-terminal';
import {useDispatch} from 'react-redux';
import {isAndroid, sleep} from '@constants/Utils';
import {setBluetoothPrinterAction} from '@store/actionTypes';

import imgQRCode from 'react-native-qrcode-svg';

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

  const getPixelBitQR = code => {
    // calculation
    const m = 0;
    const x = 4;

    // calculation
    var qrRaw = [];

    imgQRCode.generate(code, {small: true}, qrcode => {
      var lines = qrcode.split('\n');
      lines.forEach(line => {
        const width = line.length * x;
        const nL = width % 256;
        const nH = Math.floor((width - nL) / 256);

        var lineRaw = [0x1b, 0x2a, m, nL, nH];
        line.split('').forEach(dot => {
          if (dot === '▄') {
            lineRaw = lineRaw.concat(Array(x).fill(0xf));
          } else if (dot === '█') {
            lineRaw = lineRaw.concat(Array(x).fill(0xff));
          } else if (dot === '▀') {
            lineRaw = lineRaw.concat(Array(x).fill(0xf0));
          } else {
            lineRaw = lineRaw.concat(Array(x).fill(0));
          }
        });

        qrRaw = qrRaw.concat(lineRaw);
      });
    });
    return qrRaw;
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

    BleManager.retrieveServices(peripheral.id)
      .then(peripheralInfo => {
        var service = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
        var characteristic = '49535343-8841-43f4-a8d4-ecbe34729bb3';
        console.log(peripheralInfo);
        BleManager.write(peripheral.id, service, characteristic, newArr)
          .then(() => {
            console.log('Writed NORMAL crust');
            dispatch(setBluetoothPrinterAction(peripheral));
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
        console.log('lol', peripheral.id);
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

  var discoverPeripheralListener;
  var stopScanListener;
  var disconnectListener;
  var updateValueListener;

  useEffect(() => {
    BleManager.start({showAlert: true});

    discoverPeripheralListener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    stopScanListener = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      handleStopScan,
    );
    disconnectListener = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    updateValueListener = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );

    if (isAndroid && Platform.Version >= 23) {
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
      discoverPeripheralListener.remove();
      stopScanListener.remove();
      disconnectListener.remove();
      updateValueListener.remove();
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

  const renderItem = (item, i) => {
    return (
      <Item key={`device_${i}`} onPress={() => testPeripheral(item)}>
        <Label>{item.name}</Label>
        <Sublabel>RSSI: {item.rssi}</Sublabel>
        <Sublabel>UUID: {item.id}</Sublabel>
      </Item>
    );
  };
  //if (!isScanned) {
  sleep(1000).then(() => {
    startScan();
  });
  //}

  return (
    <Container>
      <Header
        bgColor={'#ffb500'}
        title={`Connect Bluetooth printer`}
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
