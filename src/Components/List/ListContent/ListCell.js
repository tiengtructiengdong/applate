import React from 'react';

import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
	cell: {
		paddingHorizontal: 24,
		borderRadius: 8,
		backgroundColor: "#f0f0f0",
		margin: 30,
		marginTop: 10,
		marginBottom: 10,
		borderColor: "#393939",
		borderWidth: 0,
		height: 85,
		shadowOpacity: 0.2,
		shadowRadius:1,
		shadowOffset: {width: 0, height: 2}
	},
	plate: {
		textAlign: 'left',
		textAlignVertical: 'center',
		position: 'absolute',

		height: 100,
		top: 28,
		left: 20,

		fontSize: 24,
		fontWeight: '700',
	},
	time: {
		textAlign: 'right',
		top: 21,
		fontSize: 18,
		fontWeight: '600',
	},
	date: {
		textAlign: 'right',
		top: 22,
		fontSize: 15,
	}
});

export class ListCell extends React.Component {
	onPressCell() {
		Alert.alert(this.props.plate, "Please report the issue here.", 
		[
			{ 	
				text: "Report lost ticket", 
				onPress: () => {
					
				}
			},
			{ 	
				text: "Cancel", 
				onPress: () => {
					
				},
				style: "cancel"
			},
		])
	}
	
	render() {
		const plate = this.props.plate
		const datetime = new Date(this.props.datetime)

		const date = `${datetime.getDate()}/${datetime.getUTCMonth()+1}/${datetime.getUTCFullYear()}`
		const time = `${datetime.getHours()}:${datetime.getMinutes()}` 

		return (
			<TouchableOpacity style={styles.cell} onPress={this.onPressCell.bind(this)}>
				<Text style={styles.plate}>{plate}</Text>
				<Text style={styles.time}>{time}</Text>
				<Text style={styles.date}>{date}</Text>
			</TouchableOpacity>
		)
	}
}