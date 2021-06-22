import React from 'react';

import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text, View} from 'react-native';
import SettingsBluetooth from './SettingsBluetooth'
import SettingsInformation from './SettingsInformation'

import {Header} from '../Header/Header'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const style = StyleSheet.create({
	container: {
		backgroundColor: '#ffb500'
	},
	cell: {
		borderBottomWidth: 1,
		borderTopWidth: 0,
		borderBottomColor: "#d0d0d0",
		backgroundColor: '#ffffff'
	},
	cellText: {
		fontWeight: '400',
		fontSize: 17,
		margin: 18,
		marginLeft: 25
	},
	scrollView: {
		height: '100%',
		backgroundColor: "#ffffff"
	},
	about: {
		padding: 25
	},
	bold: {
		fontSize: 14,
		fontWeight: '400',
		paddingBottom: 3,
		color: '#909090'
	},
	regular: {
		fontSize: 12,
		fontWeight: '400',
		paddingBottom: 4,
		color: '#aeaeae'
	}
});


export class SettingsVC extends React.Component {
	title = ""

	SettingsList({navigation}) {
		return (
			<SafeAreaView style={style.container}>
				<Header bgColor='#ffb500' title="Settings"></Header>
				<ScrollView style={style.scrollView}>
					<TouchableOpacity style={style.cell} onPress={() => navigation.navigate('Information')}>
						<Text style={style.cellText}>Parker Information</Text>
					</TouchableOpacity>

					<TouchableOpacity style={style.cell} onPress={() => navigation.navigate('Bluetooth')}>
						<Text style={style.cellText}>Bluetooth</Text>
					</TouchableOpacity>

					<View style={style.about}>
						<Text style={style.regular}>This project is for educational purposes only.</Text>
						<Text style={style.bold}>applate v0.16</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}


	Bluetooth({navigation}) {
		return (
			<SettingsBluetooth navigation={navigation}></SettingsBluetooth>
		)
	}

	Information({navigation}) {
		return (
			<SettingsInformation navigation={navigation}></SettingsInformation>
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