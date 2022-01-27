import React, {useState} from 'react';
import Realm from 'realm';

import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import {Header} from '../Header';
import {Picker} from '@react-native-picker/picker';

import uuid from 'react-native-uuid';
import DefaultPreference from 'react-native-default-preference';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const parkingLot = {
  name: 'parkingLot',
  properties: {
    id: {type: 'int'},
    plateId: {type: 'string'},
    code: {type: 'string'},
    checkinDate: {type: 'string'},
    state: {type: 'string'},
    updateOnlineLater: {type: 'bool'},
    isCheckedOut: {type: 'bool'},
  },
};

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

const popupStyle = StyleSheet.create({
  bg: {
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  popup: {
    position: 'absolute',
    width: 400,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default class ScanVC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOut: false,
      checkIn: false,
      connected: false,
      mounted: false,
    };
  }

  componentDidMount() {
    const navigation = this.props.navigation;

    this._unsubscribe = navigation.addListener('focus', () => {
      this.forceUpdate();
    });

    this.setState({
      mounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      mounted: false,
    });
  }

  onBarCodeRead(scanResult) {
    if (!this.state.checkOut && !this.state.checkIn) {
      Realm.open({schema: [parkingLot]}).then(realm => {
        const obj = realm
          .objects('parkingLot')
          .filtered(`code == \"${scanResult.data}\"`)[0];
        this.setState({checkOut: true});

        if (obj) {
          const plate = obj.plateId;

          Alert.alert('Checkout', plate, [
            {
              text: 'Cancel',
              onPress: () => {
                this.setState({checkOut: false});
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                this.setState({checkOut: false});
                this.processCheckout(plate);
              },
            },
          ]);
        } else {
          Alert.alert('Invalid ticket!', 'The vehicle may have checked out.', [
            {
              text: 'OK',
              onPress: () => {
                this.setState({checkOut: false});
              },
            },
          ]);
        }
      });
    }
  }

  onTextRecognized(text) {
    const regEx =
      /[1-9][0-9]\-?[A-Z][A-Z0-9]?\n[0-9]{3}([0-9]|(\.|\-)[0-9]{2})/;

    if (!this.state.checkIn && !this.state.checkOut) {
      const block = text.textBlocks.map(e => e.value);

      if (block.length > 0) {
        const data = block.join('');
        const plate = data.match(regEx);

        if (plate) {
          this.setState({checkIn: true});
          const plateStr = plate[0].replace('-', '').replace('\n', '-');

          Alert.alert('Checkin', plateStr, [
            {
              text: 'Cancel',
              onPress: () => {
                this.setState({checkIn: false});
              },
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                this.setState({checkIn: false});
                this.processCheckin(plateStr);
              },
            },
          ]);
        }
      }
    }
  }

  printTicket(plate, uuid) {
    DefaultPreference.get('name').then(name => {
      BluetoothEscposPrinter.printerInit().then(() => {
        BluetoothEscposPrinter.printText('Park:  ' + name + '\n', {}).then(
          () => {
            BluetoothEscposPrinter.printText('Plate: ' + plate + '\n', {}).then(
              () => {
                BluetoothEscposPrinter.printQRCode(
                  uuid,
                  360,
                  BluetoothEscposPrinter.ERROR_CORRECTION.L,
                ).then(() => {
                  BluetoothEscposPrinter.printText(
                    'Powered by Applate\n\n\n\n',
                    {},
                  ).then(() => {});
                });
              },
            );
          },
        );
      });
    });
  }

  processCheckin(plate) {
    Realm.open({schema: [parkingLot]}).then(realm => {
      var uuid_code = uuid.v4();

      // this.printTicket(plate, uuid_code);
      // realm.write(() => {
      //   realm.create('parkingLot', {
      //     id: 1950,
      //     plateId: plate,
      //     code: uuid_code,
      //     checkinDate: Date().toString(),
      //     state: 'new',
      //     updateOnlineLater: false,
      //     isCheckedOut: false,
      //   });
      // });
    });
  }

  processCheckout(plate) {
    Realm.open({schema: [parkingLot]}).then(realm => {
      const obj = realm
        .objects('parkingLot')
        .filtered(`plateId == \"${plate}\"`);
      realm.write(() => {
        realm.delete(obj);
      });
    });
  }

  render() {
    data = this.props.data;

    BluetoothManager.isConnected().then(connect => {
      this.setState({
        connected: connect == 'true' ? true : false,
      });
    });

    let camera;

    if (this.state.connected) {
      camera = (
        <RNCamera
          ref={cam => (this.camera = cam)}
          captureAudio={false}
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          style={{flex: 1, borderRadius: 10, zIndex: 3}}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onTextRecognized={this.onTextRecognized.bind(this)}
          autoFocus="on"
          autoFocusPointOfInterest={{x: 0.5, y: 0.5}}
        />
      );
    } else {
      camera = (
        <View style={[{alignSelf: 'center'}]}>
          <Text style={style.cameraContentText}>No printer is connected.</Text>
        </View>
      );
    }

    const view = (
      <SafeAreaView style={style.container}>
        <Header
          title="Scan plate or QR ticket"
          bgColor="#323232"
          titleColor="#ffffff"></Header>
        <View style={style.body}>
          <View style={style.selectorArea}>
            <Picker style={style.selector}>
              <Picker.Item
                label="Parking Lot ABC"
                value="fixed"
                color={'#ffffff'}
              />
              <Picker.Item
                label="Repair Shop DX"
                value="hour"
                color={'#ffffff'}
              />
            </Picker>
          </View>
          <View style={style.cameraArea}>
            <View
              style={[
                style.cameraView,
                {
                  borderColor: !this.state.connected
                    ? '#ff3511'
                    : this.state.checkOut || this.state.checkIn
                    ? '#07e722'
                    : '#ffc500',
                },
              ]}>
              <View style={style.cameraContent}>{camera}</View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );

    return view;
  }
}
