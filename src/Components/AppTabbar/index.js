import React, {memo} from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
  container: {
    borderRadius: 26,
    borderColor: '#777777',
    borderWidth: 1,
    shadowOffset: {width: 0, height: 5},
    marginLeft: 26,
    marginRight: 26,
    height: 67,
  },

  buttonLeft: {
    height: 100,
    position: 'absolute',
    left: 45,
    alignContent: 'center',
    marginTop: 11,
  },

  buttonMiddle: {
    position: 'relative',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 11,
  },

  buttonRight: {
    position: 'absolute',
    right: 45,
    alignContent: 'center',
    marginTop: 11,
  },
});

class AppTabbar extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: 0,
    };
  }

  render() {
    return (
      <View
        style={[
          {
            height: 100,
            overflow: 'visible',
            backgroundColor: '#121212',
          },
        ]}>
        <View
          style={[
            style.container,
            {
              backgroundColor: '#00000000',
            },
          ]}>
          <TouchableOpacity
            style={style.buttonLeft}
            onPress={this.navigateList}>
            <Icon
              name="list"
              size={36}
              color={this.state.activeTab == 0 ? '#ffc500' : '#777777'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={style.buttonMiddle}
            onPress={this.navigateScan}>
            <Icon
              name="qr-code-outline"
              size={36}
              color={this.state.activeTab == 1 ? '#ffc500' : '#777777'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={style.buttonRight}
            onPress={this.navigateSettings}>
            <Icon
              name="cog-outline"
              size={36}
              color={this.state.activeTab == 2 ? '#ffc500' : '#777777'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  navigateList = () => {
    this.props.navigation.navigate('List');
    this.setState({
      activeTab: 0,
    });
  };
  navigateScan = () => {
    this.props.navigation.navigate('Scan');
    this.setState({
      activeTab: 1,
    });
  };
  navigateSettings = () => {
    this.props.navigation.navigate('Settings');
    this.setState({
      activeTab: 2,
    });
  };
}

export default memo(AppTabbar);
