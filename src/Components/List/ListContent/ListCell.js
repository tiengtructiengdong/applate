import React from 'react';
import DefaultPreference from 'react-native-default-preference';

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
		shadowOffset: {width: 0, height: 2},
		justifyContent: 'center'
	},
	plate: {
		textAlign: 'left',
		position: 'absolute',
		left: 20,

		fontSize: 24,
		fontWeight: '700',
	},
	price: {
		textAlign: 'right',
		fontSize: 18,
		fontWeight: '700',
	},
	datetime: {
		textAlign: 'right',
		fontSize: 15,
	}
});

export class ListCell extends React.Component {
	constructor() {
		super()
		this.state = {
			price: 0,
			priceMode: ''
		}
	}

	componentDidMount() {
        DefaultPreference.get("price").then((price)=>{
            this.setState({price: price})
        })
        DefaultPreference.get("priceMode").then((priceMode)=>{
            this.setState({priceMode: priceMode})
            console.log(priceMode)
        })
	}
	
	onPressCell() {
		Alert.alert(this.props.plate, "Please report the issue here.", 
		[
			{ 	
				text: "Report ticket loss", 
				onPress: () => {
					this.props.reportTicketLoss()
				},
				style: "destructive"
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

		const datetime = new Date() //new Date(this.props.datetime)
		const datetimeStr = `${datetime.getDate()}/${datetime.getUTCMonth()+1}/${datetime.getUTCFullYear()} ${datetime.getHours()}:${datetime.getMinutes()}`

		const diffDate = Date() - datetime
		const diffHour = diffDate.getHours
		const diffDay = diffDate.getDate

		var price
		switch (this.state.priceMode) {
			case 'fixed':
				price = this.state.price
				break
			case 'hour':
				price = this.state.price * (diffHour + 1)
				break
			case 'day':
				price = this.state.price * (diffDate + 1)
				break
			default:
				break
		}

		return (
			<TouchableOpacity style={styles.cell} onPress={this.onPressCell.bind(this)}>
				<Text style={styles.plate}>{plate}</Text>
				<Text style={styles.price}>{price}đ</Text>
				<Text style={styles.datetime}>{datetimeStr}</Text>
			</TouchableOpacity>
		)
	}
}