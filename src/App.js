import React from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {ListVC} from './Components/List/ListVC.js'
import {ScanVC} from './Components/Scan/ScanVC.js'
import {SettingsVC} from './Components/Settings/SettingsVC.js'

import {AppTabbar} from "./Components/AppTabbar/AppTabbar.js"


function List({navigation}) {
	return (
		<ListVC navigation={navigation}></ListVC>
	)
}

function Scan({navigation}) {
	return (
		<ScanVC navigation={navigation}></ScanVC>
	)
}

function Settings({navigation}) {
	return (
		<SettingsVC navigation={navigation}></SettingsVC>
	)
}

function App() {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<NavigationContainer>
			<Tab.Navigator tabBar={(props) => <AppTabbar {...props} />}>
				<Tab.Screen name="List" component={List}/>
				<Tab.Screen name="Scan" component={Scan} options={{ tabBarBadge: 3 }}/>
				<Tab.Screen name="Settings" component={Settings}/>
			</Tab.Navigator> 
		</NavigationContainer>
	);
};

//org.reactjs.native.example.plateapp

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default App;