import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import DefaultPreference from 'react-native-default-preference';

import {Header} from '../Header/Header';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffb500',
  },
  cell: {
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderBottomColor: '#d0d0d0',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    minHeight: 50,
    overflow: 'hidden',
  },
  cellText: {
    fontSize: 17,
    marginLeft: 25,
    position: 'absolute',
  },
  scrollView: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  about: {
    padding: 25,
  },
  bold: {
    fontSize: 14,
    fontWeight: '400',
    paddingBottom: 3,
    color: '#909090',
  },
  regular: {
    fontSize: 12,
    fontWeight: '400',
    paddingBottom: 4,
    color: '#aeaeae',
  },
  languageSwitch: {
    fontWeight: '400',
    fontSize: 12,
    marginLeft: 120,
    marginRight: 0,
    textAlign: 'right',
  },
});

export default class SettingsList extends React.Component {
  title = '';
  constructor() {
    super();
    this.state = {
      language: '',
    };
  }

  componentDidMount() {
    DefaultPreference.get('language').then(language => {
      this.setState({language: language});
    });
  }

  updateLanguage(val) {
    DefaultPreference.set('language', val).then(() => {
      DefaultPreference.get('language').then(language => {
        this.setState({language: language});
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Header bgColor="#ffb500" title="Settings"></Header>
        <ScrollView style={style.scrollView} scrollEnabled={false}>
          <TouchableOpacity
            style={style.cell}
            onPress={() => this.props.navigation.navigate('Information')}>
            <Text style={style.cellText}>Information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.cell}
            onPress={() => this.props.navigation.navigate('Bluetooth')}>
            <Text style={style.cellText}>Bluetooth</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.cell} onPress={() => {}}>
            <Text style={style.cellText}>Login to online account</Text>
          </TouchableOpacity>

          <View style={style.about}>
            <Text style={style.regular}>
              This project is for educational purposes only.
            </Text>
            <Text style={style.bold}>applate v0.16</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
