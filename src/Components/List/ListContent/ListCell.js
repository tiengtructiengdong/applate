import React from 'react';
import DefaultPreference from 'react-native-default-preference';

import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DialogInput from 'react-native-dialog-input';

import Realm from 'realm'
const parkingLot = {
	name: "parkingLot",
	properties: {
		id: {type : 'int'},
		plateId: {type : 'string'},
		code: {type : 'string'},
		checkinDate: {type : 'string'},
		checkoutDate: {type : 'string'},
		state: {type : 'string'},
		mobile: {type : 'string'}
	}
}

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
		color: '#0067d4'
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
			priceMode: '',
			appMode: '',
			vehicleState: '',
			mobile: '',
			isEditingMobile: false
		}

        DefaultPreference.get("price").then((price)=>{
            this.setState({price: price})
        })
        DefaultPreference.get("priceMode").then((priceMode)=>{
            this.setState({priceMode: priceMode})
        })
        DefaultPreference.get("appMode").then((appMode)=>{
            this.setState({appMode: appMode})
        })
	}

	componentDidMount() {
		this.setState({
			vehicleState: this.props.state,
			mobile: this.props.mobile
		})
	}
	
	changeVehicleState(newState) {
		Realm.open({schema: [parkingLot]}).then((realm)=>{
			var obj = realm.objects("parkingLot").filtered(`plateId == '${this.props.plate}'`)[0]
			console.log(obj)
			realm.write(()=>{
				obj.state = newState
				this.setState({
					vehicleState: newState
				})
			})
		})
	}

	addMobile() {
		this.setState({isEditingMobile: true})
	}

	onPressCell() {
		var cmds
		if (this.state.appMode == 'parking') {
			cmds = [
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
			]
		}
		else {
			cmds = [
				{ 	
					text: "Vehicle under repair", 
					onPress: () => {
						this.changeVehicleState('underRepair')
					},
					style: "cancel"
				},
				{ 	
					text: "Repaired", 
					onPress: () => {
						this.changeVehicleState('repaired')
					},
					style: "cancel"
				},
				{ 	
					text: "Save mobile phone number", 
					onPress: () => {
						this.addMobile()
					},
					style: "cancel"
				},
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
			]
		}
		Alert.alert(this.props.plate, '', cmds)
	}
	
	render() {
		const plate = this.props.plate
		const datetime = new Date(this.props.datetime)

		const dateStr = `${datetime.getDate()}/${datetime.getUTCMonth()+1}/${datetime.getUTCFullYear()}`
		const timeStr = `${String(datetime.getHours()).padStart(2, '0')}:${String(datetime.getMinutes()).padStart(2, '0')}` 

		const diff = new Date((new Date()) - datetime)
		const diffHour = parseInt(diff/1000/60/60)
		const diffDay =  parseInt(diffHour/24)

		if (this.state.appMode == 'parking') {
			var price = parseInt(this.state.price)

			switch (this.state.priceMode) {
				case 'hour':
					price *= (diffHour + 1)
					break
				case 'day':
					price *= (diffDay + 1)
					break
				default:
					break
			}

			const format = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' })

			return (
				<TouchableOpacity style={styles.cell} onPress={this.onPressCell.bind(this)}>
					<Text style={styles.plate}>{plate}</Text>
					<Text style={styles.price}>{format.format(price)}</Text>
					<Text style={styles.datetime}>{timeStr}</Text>
					<Text style={styles.datetime}>{dateStr}</Text>
				</TouchableOpacity>
			)
		} else {
			const state = this.state.vehicleState
			return ([
				<TouchableOpacity style={styles.cell} onPress={this.onPressCell.bind(this)}>
					<Text style={styles.plate}>{plate}</Text>
					<Text style={styles.price}>{state}</Text>
					<Text style={styles.datetime}>{timeStr}</Text>
					<Text style={styles.datetime}>{dateStr}</Text>
				</TouchableOpacity>,
				
				<DialogInput isDialogVisible={this.state.isEditingMobile}
					title={"Enter new mobile phone number"}
					hintInput ={"Mobile phone"}
					submitInput={ (inputMobile) => {
						Realm.open({schema: [parkingLot]}).then((realm)=>{
							var obj = realm.objects("parkingLot").filtered(`plateId == '${this.props.plate}'`)[0]
							console.log(obj)
							realm.write(()=>{
								obj.mobile = inputMobile
							})
							this.setState({
								mobile: inputMobile
							})
						})
						this.setState({isEditingMobile: false})
					}}
					closeDialog={ () => {
						this.setState({isEditingMobile: false})
					}} 
				/>
			])
		}
	}
}