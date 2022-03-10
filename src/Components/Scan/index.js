import React, {memo, useEffect, useState} from 'react';
import EscPosEncoder from 'esc-pos-encoder';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import BleManager, {start} from 'react-native-ble-manager';
import {Header} from '../Header';
import {currentParkingLotSelector} from '@store/selectors/parkingLotSelector';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkinAction,
  checkoutAction,
  setupCustomerListenerAction,
  testCheckinAction,
  testCheckoutAction,
} from '@store/actionTypes';
import qrcode from 'qrcode-terminal';

import {popUp} from '@constants/Utils';

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -40,
    backgroundColor: '#323232',
  },
  body: {
    flex: 1,
    height: '100%',
    backgroundColor: '#121212',
    paddingVertical: 20,
    flexDirection: 'column',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: '600',
    height: 50,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  confirmButton: {
    backgroundColor: '#00f5f5',
    fontSize: 65,
    height: 150,
    borderRadius: 25,
    width: 200,
    height: 50,
    alignSelf: 'center',
    margin: 20,
  },
  cameraArea: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 70,
  },
  cameraView: {
    borderWidth: 2,
    padding: 20,
    aspectRatio: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    overflow: 'hidden',
    top: -80,
  },
  cameraContent: {
    backgroundColor: '#353535',
    width: Dimensions.get('window').width - 100,
    aspectRatio: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    padding: 0,
    backgroundColor: '#ff8800',
    position: 'absolute',
    top: 0,
    zIndex: 99,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  cameraContentText: {
    color: '#636363',
    fontSize: 15,
  },
  selectorArea: {
    height: 50,
    marginBottom: 100,
    marginHorizontal: 25,
    flexDirection: 'row',
    overflow: 'hidden',
    borderColor: '#555555',
    borderWidth: 1,
    borderRadius: 10,
  },
  selector: {
    fontWeight: '400',
    fontSize: 17,
    flex: 1,
    alignSelf: 'center',
  },
});

const Scan = ({}) => {
  const [checkOut, setCheckout] = useState(false);
  const [checkIn, setCheckin] = useState(false);
  const [connected, setConnected] = useState(true); //temp
  const [mounted, setMounted] = useState(false);

  const peripherals = new Map();
  var deviceList = [];

  const dispatch = useDispatch();
  const parkingLot = useSelector(currentParkingLotSelector);
  const id = parkingLot.Id || -1;

  const getQR = code => {
    // calculation
    const m = 0;
    const x = 4;

    // calculation
    var qrRaw = [];

    qrcode.generate(code, {small: true}, qrcode => {
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
  const onBarCodeRead = code => {
    if (!checkOut) {
      dispatch(testCheckoutAction(id, code.data));
      setCheckout(true);
    }
  };
  const printTicket = async data => {
    var ret = false;
    const {plateId, code} = data;

    const encoder = new EscPosEncoder();
    const res = encoder
      .initialize()
      .text(
        parkingLot.Name
          ? `Parking Lot: ${parkingLot.Name}`
          : 'Applate Parking Lot',
      )
      .newline()
      .text(plateId || 'Vehicle')
      .newline()
      //.raw(getQR(code))
      .qrcode(code)
      .newline()
      .text('Powered by Applate')
      .newline()
      .newline()
      .encode();
    var newArr = [];
    for (i in res) {
      newArr[i] = res[i] & 0xff;
    }

    if (deviceList.length === 0) {
      const results = await BleManager.getConnectedPeripherals([]);
      console.log('this', results);
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        deviceList = Array.from(peripherals.values());
      }

      console.log(deviceList);
      if (deviceList.length === 0) {
        throw new Error('No printers');
      }
    }

    for (let peripheral of deviceList) {
      try {
        const peripheralInfo = await BleManager.retrieveServices(peripheral.id);
        var service = '49535343-fe7d-4ae5-8fa9-9fafd205e455';
        var characteristic = '49535343-8841-43f4-a8d4-ecbe34729bb3';
        console.log(peripheralInfo);
        await BleManager.write(peripheral.id, service, characteristic, newArr);
        console.log('Writed NORMAL crust');
        ret = true;
      } catch (err) {
        console.log('Device error, next device', err);
        continue;
      }
    }

    if (ret === false) {
      deviceList = [];
      throw new Error('Cannot print. Please reconnect');
    }
  };
  const onTextRecognized = text => {
    const regEx =
      /[1-9][0-9]\-?[A-Z][A-Z0-9]?\n[0-9]{3}([0-9]|(\.|\-)[0-9]{2})/;

    if (!checkIn && !checkOut) {
      const block = text.textBlocks.map(e => e.value);

      if (block.length > 0) {
        const data = block.join('');
        const plate = data.match(regEx);

        if (plate) {
          setCheckin(true);
          const plateStr = plate[0].replace('-', '').replace('\n', '-');

          Alert.alert('Checkin', plateStr, [
            {
              text: 'Cancel',
              onPress: () => {
                setCheckin(false);
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                setCheckin(false);
                processCheckin(plateStr);
              },
            },
          ]);
        }
      }
    }
  };
  const processCheckin = plateId => {
    dispatch(testCheckinAction(parkingLot.Id, plateId));
  };
  const onTestCheckinSuccess = data => {
    const {plateId, code} = data;
    dispatch(checkinAction(parkingLot.Id, plateId, code));
  };
  const onCheckinSuccess = data => {
    console.log('Checkin success!', data);
  };
  const onTestCheckoutSuccess = plateId => {
    Alert.alert('Checkout', plateId, [
      {
        text: 'Cancel',
        onPress: () => {
          setCheckout(false);
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setCheckout(false);
          dispatch(checkoutAction(parkingLot.Id, plateId));
        },
      },
    ]);
  };
  const onTestCheckoutFailed = () => {
    popUp(
      'Invalid QR code!',
      'The vehicle has probably been checked out.',
      () => {
        setCheckout(false);
      },
    );
  };

  useEffect(() => {
    dispatch(
      setupCustomerListenerAction(
        onTestCheckinSuccess,
        onCheckinSuccess,
        onTestCheckoutSuccess,
        onTestCheckoutFailed,
        printTicket,
      ),
    );
  }, [dispatch]);

  return (
    <SafeAreaView style={style.container}>
      <Header
        title={parkingLot.Name}
        bgColor="#323232"
        titleColor="#ffffff"></Header>
      <View style={style.body}>
        <View style={style.cameraArea}>
          <View
            style={[
              style.cameraView,
              {
                borderColor: !connected
                  ? '#ff3511'
                  : checkOut || checkIn
                  ? '#07e722'
                  : '#ffc500',
              },
            ]}>
            <View style={style.cameraContent}>
              {connected ? (
                <RNCamera
                  captureAudio={false}
                  defaultTouchToFocus
                  style={{flex: 1, borderRadius: 10, zIndex: 3}}
                  onBarCodeRead={onBarCodeRead}
                  onTextRecognized={onTextRecognized}
                  autoFocus="on"
                  autoFocusPointOfInterest={{x: 0.5, y: 0.5}}
                />
              ) : (
                <View style={[{alignSelf: 'center'}]}>
                  <Text style={style.cameraContentText}>
                    No printer is connected.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(Scan);
