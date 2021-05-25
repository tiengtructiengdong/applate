import React from 'react';

import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';

const styles = StyleSheet.create({
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
});

import {Header} from '../Header/Header.js'


export class SettingsVC extends React.Component {
	title = ""

	render() {
		return (
			<SafeAreaView style={[{backgroundColor: '#ffb500'}]}>
				<Header bgColor='#ffb500' title="Settings"></Header>
				<ScrollView style={styles.scrollView}>
					<TouchableOpacity style={styles.cell}>
						<Text style={styles.cellText}>About</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.cell}>
						<Text style={styles.cellText}>Data settings</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.cell}>
						<Text style={styles.cellText}>Bluetooth printer</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		) 
	}
}