import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 40,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '300',
  },
});

export class ListContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>My Location</Text>
      </View>
    );
  }
}
