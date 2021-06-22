import React from 'react';

import SettingsList from './SettingsList'
import SettingsBluetooth from './SettingsBluetooth'
import SettingsInformation from './SettingsInformation'

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();


export class SettingsVC extends React.Component {
	title = ""

	SettingsList({navigation}) {
		return (
			<SettingsList navigation={navigation} />
		)
	}

	Bluetooth({navigation}) {
		return (
			<SettingsBluetooth navigation={navigation} />
		)
	}

	Information({navigation}) {
		return (
			<SettingsInformation navigation={navigation} />
		)
	}

	render() {
		return (
			<Stack.Navigator headerMode='none'>
				<Stack.Screen name="SettingsList" component={this.SettingsList} navigation={this.props.navigation}/>
				<Stack.Screen name="Information" component={this.Information} navigation={this.props.navigation}/>
				<Stack.Screen name="Bluetooth" component={this.Bluetooth} navigation={this.props.navigation}/>
			</Stack.Navigator>
		) 
	}
}