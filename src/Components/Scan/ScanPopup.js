import React from 'react';

import {SafeAreaView, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export class ScanPopup extends React.Component {
  qrCodeData = '';
  plateData = '';

  constructor(props) {
    super(props);
  }

  render() {
    data = this.props.data;

    return <View></View>;
  }
}
