import React, {memo, useState} from 'react';
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

import uuid from 'react-native-uuid';

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
  const [connected, setConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  const onBarCodeRead = scanResult => {};

  const onTextRecognized = text => {
    const regEx =
      /[1-9][0-9]\-?[A-Z][A-Z0-9]?\n[0-9]{3}([0-9]|(\.|\-)[0-9]{2})/;

    if (!checkIn && !checkOut) {
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
  };

  const printTicket = (plate, uuid) => {};

  const processCheckin = plate => {
    var uuid_code = uuid.v4();
  };

  const processCheckout = plate => {};

  return (
    <SafeAreaView style={style.container}>
      <Header
        title="Scan plate or QR ticket"
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
