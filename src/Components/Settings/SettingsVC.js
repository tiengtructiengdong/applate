import React from 'react';

import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text, View} from 'react-native';
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
		padding: 36
	},
	bold: {
		fontSize: 30,
		fontWeight: '600',
		paddingBottom: 10
	},
	regular: {
		fontSize: 17,
		fontWeight: '400',
		paddingBottom: 8
	}
});

import {Header} from '../Header/Header.js'

export class SettingsVC extends React.Component {
	title = ""

	SettingsList({navigation}) {
		return (
			<SafeAreaView style={style.container}>
				<Header bgColor='#ffb500' title="Settings"></Header>
				<ScrollView style={style.scrollView}>
					<TouchableOpacity style={style.cell} onPress={() => navigation.navigate('About')}>
						<Text style={style.cellText}>About</Text>
					</TouchableOpacity>

					<TouchableOpacity style={style.cell}>
						<Text style={style.cellText}>Data settings</Text>
					</TouchableOpacity>

					<TouchableOpacity style={style.cell}>
						<Text style={style.cellText}>Bluetooth printer</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		)
	}

	About({navigation}) {
		return (
			<SafeAreaView style={style.container}>
				<Header bgColor='#ffb500' title="About" goBack={()=>navigation.goBack()}></Header>
				<ScrollView style={[style.scrollView, style.about]}>
					<Text style={style.bold}>applate</Text>
					<Text style={style.regular}>v0.16</Text>
					<Text style={style.regular}>This project is for educational purposes only.</Text>
				</ScrollView>
			</SafeAreaView>
		)
	}

	render() {
		return (
			<Stack.Navigator headerMode='none'>
				<Stack.Screen name="SettingsList" component={this.SettingsList} navigation={this.props.navigation}/>
				<Stack.Screen name="About" component={this.About} navigation={this.props.navigation}/>
			</Stack.Navigator>
		) 
	}
}