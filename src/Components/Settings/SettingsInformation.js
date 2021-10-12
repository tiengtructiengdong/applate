import React, {Component} from 'react';
import DefaultPreference from 'react-native-default-preference';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellLabel: {
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 25,
    alignSelf: 'center',
  },
  cellText: {
    fontWeight: '400',
    fontSize: 17,
    marginLeft: 120,
    marginRight: 16,
    textAlign: 'right',
    flex: 1,
    alignSelf: 'center',
  },
  selectorRight: {
    fontWeight: '400',
    fontSize: 17,
    flex: 1,
    alignSelf: 'center',
  },
  scrollView: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  bold: {
    fontSize: 30,
    fontWeight: '600',
    paddingBottom: 10,
  },
  regular: {
    fontSize: 17,
    fontWeight: '400',
    paddingBottom: 8,
  },
});

export default class SettingsInformation extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      price: 0,
      carPrice: 0,
      priceMode: 'fixed',
      appMode: '',
    };
    DefaultPreference.get('name').then(name => {
      this.getName(name);
    });
    DefaultPreference.get('price').then(price => {
      this.getPrice(price);
    });
    DefaultPreference.get('carPrice').then(price => {
      this.getCarPrice(price);
    });
    DefaultPreference.get('priceMode').then(priceMode => {
      this.getPriceMode(priceMode);
    });
    DefaultPreference.get('appMode').then(appMode => {
      this.setState({appMode: appMode});
    });
  }

  getName(name) {
    this.setState({name: name});
  }
  getPrice(price) {
    this.setState({price: price});
  }
  getCarPrice(price) {
    this.setState({carPrice: price});
  }
  getPriceMode(priceMode) {
    this.setState({priceMode: priceMode});
  }

  render() {
    var parkingLotInfo;
    if (this.state.appMode == 'parking') {
      parkingLotInfo = (
        <View>
          <View style={style.cell}>
            <Text style={style.cellLabel}>Bike fee (VND)</Text>

            <TextInput
              style={style.cellText}
              placeholder="0"
              placeholderTextColor="#000000"
              returnKeyType="done"
              multiline={true}
              onChangeText={this.getPrice.bind(this)}
              onEndEditing={this.updatePrice.bind(this)}
              keyboardType="numeric"
              blurOnSubmit={true}>
              {this.state.price}
            </TextInput>
          </View>

          <View style={style.cell}>
            <Text style={style.cellLabel}>Car fee (VND)</Text>

            <TextInput
              style={style.cellText}
              placeholder="0"
              placeholderTextColor="#000000"
              returnKeyType="done"
              multiline={true}
              onChangeText={this.getCarPrice.bind(this)}
              onEndEditing={this.updateCarPrice.bind(this)}
              keyboardType="numeric"
              blurOnSubmit={true}>
              {this.state.carPrice}
            </TextInput>
          </View>

          <View style={[style.cell, {height: 50}]}>
            <Picker
              style={style.selectorRight}
              selectedValue={this.state.priceMode}
              onValueChange={this.updatePriceMode.bind(this)}>
              <Picker.Item label="Fixed price" value="fixed" />
              <Picker.Item label="Hourly" value="hour" />
              <Picker.Item label="Day" value="day" />
            </Picker>
          </View>
        </View>
      );
    }

    return (
      <SafeAreaView style={style.container}>
        <Header
          bgColor="#ffb500"
          title="Information"
          goBack={this.submit.bind(this)}></Header>
        <ScrollView style={style.scrollView} scrollEnabled={false}>
          <View style={[style.cell, {height: 50}]}>
            <Text style={style.cellLabel}>Legacy Location Type</Text>
            <Picker
              style={style.selectorRight}
              selectedValue={this.state.appMode}
              onValueChange={this.updateAppMode.bind(this)}>
              <Picker.Item label="🅿️ Parking lot" value="parking" />
              <Picker.Item label="🔧 Repair shop" value="repair" />
            </Picker>
          </View>

          <View style={style.cell}>
            <Text style={style.cellLabel}>Location Name</Text>

            <TextInput
              style={style.cellText}
              placeholder="Location name"
              returnKeyType="done"
              multiline={true}
              onChangeText={this.getName.bind(this)}
              onEndEditing={this.updateName.bind(this)}
              blurOnSubmit={true}>
              {this.state.name}
            </TextInput>
          </View>

          {parkingLotInfo}
        </ScrollView>
      </SafeAreaView>
    );
  }

  submit() {
    this.props.navigation.goBack();
  }

  updateName() {
    DefaultPreference.set('name', this.state.name).then(() => {});
  }

  updatePrice() {
    const price = this.state.price;
    DefaultPreference.set('price', price == '' ? '0' : price).then(() => {});
  }

  updateCarPrice() {
    const carPrice = this.state.carPrice;
    DefaultPreference.set('carPrice', carPrice == '' ? '0' : carPrice).then(
      () => {},
    );
  }

  updateAppMode(val) {
    DefaultPreference.set('appMode', val).then(() => {
      DefaultPreference.get('appMode').then(appMode => {
        this.setState({appMode: appMode});
      });
    });
  }

  updatePriceMode(val) {
    DefaultPreference.set('priceMode', val).then(() => {
      DefaultPreference.get('priceMode').then(priceMode => {
        this.getPriceMode(priceMode);
      });
    });
  }
}
