import React, {useState} from 'react';
import Realm from 'realm'

import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

import {BleManager} from "react-native-ble-plx"

import {Header} from '../Header/Header'
import {EscPos} from '../../Model/EscPos'


const PlateData = {
	name: "Plate",
	properties: {
		id: {type : 'int'},
		plateId: {type : 'string'},
		code: {type : 'string'},
		checkinDate: {type : 'string'},
		checkoutDate: "string"
	}
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#323232"
	},
	body: {
		height: '100%', 
		backgroundColor: "#121212"
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	},
	sectionTitle: {
		fontSize: 35,
		fontWeight: '600',
		height: 50
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
	confirmButton: {
		backgroundColor: '#00f5f5',
		fontSize: 65,
		height: 150,
		borderRadius: 25,
		width: 200,
		height: 50,
		alignSelf: 'center',
		margin: 20
	},
	cameraView: {
		borderWidth: 2,
		height: 350,
		aspectRatio: 1,
		alignSelf: 'center',
		transform: [{translateY: '100%'}],
		borderRadius: 27,
		overflow: 'hidden'
	},
	cameraContent: {
		backgroundColor: '#353535',
		height: 300,
		aspectRatio: 1,
		alignSelf: 'center',
		transform: [{translateY: 23}],
		borderRadius: 10,
		overflow: 'hidden'
	},
	card: {
		padding:0,
		backgroundColor:"#ff8800",
		position: 'absolute',
		top: 0,
		zIndex:99,
		elevation:5,
		width: '100%',
		height: '100%'
	}
});

const popupStyle = StyleSheet.create({
	bg: {
		backgroundColor: "#000000",
		opacity: 0.5,
	},
	popup: {
		position: 'absolute',
		width: 400,
		height: 200,
		borderRadius: 10,
		alignSelf: 'center'
	}
})

export class ScanVC extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			checkOut: false,
			checkIn: false
		};
		this.manager = new BleManager();
	}

	componentDidMount() {
		this.state = {
			checkOut: false,
			checkIn: false
		};
		const subscription = this.manager.onStateChange((state) => {
			if (state === 'PoweredOn') {
				this.scanAndConnect();
				subscription.remove();
			}
		}, true);
	}

	scanAndConnect() {
		this.manager.startDeviceScan(null, null, (error, device) => {
			console.log(device);
	  
			if (error) {
			  this.error(error.message);
			  return
			}
	  
			if (device.name ==='GB01') {
			  this.info("Connecting to Tappy");
			  this.manager.stopDeviceScan();
	  
			  device.connect()
				.then((device) => {
				  this.info("Discovering services and characteristics");
				  return device.discoverAllServicesAndCharacteristics()
				})
				.then((device) => {
				  this.info(device.id);
				  device.writeCharacteristicWithResponseForService('12ab', '34cd', 'aGVsbG8gbWlzcyB0YXBweQ==')
					.then((characteristic) => {
					  this.info(characteristic.value);
					  return 
					})
				})
				.catch((error) => {
				  this.error(error.message)
				})
			 }
		 });
	}

	onBarCodeRead(scanResult) {
		const regEx = /[0-9]{2}[A-Z][A-Z0-9]\-[0-9]{3}([0-9]|(\.|\-)[0-9]{2})/

		if (!this.state.checkOut && !this.state.checkIn) {
			const plate = scanResult.data.match(regEx)

			if (plate) {
				this.setState({checkOut: true})
				
				Alert.alert("Checkout", scanResult.data, 
				[
					{ 	
						text: "Cancel", 
						onPress: () => {
							this.setState({checkOut: false})
						},
						style: "cancel"
					},
					{ 	
						text: "OK", 
						onPress: () => {
							this.setState({checkOut: false})
							this.processCheckout(scanResult.data)
						}
					}
				])
			}
		}
	}

	onTextRecognized(text) {
		const regEx = /[1-9][0-9]\-?[A-Z][A-Z0-9]?\n[0-9]{3}([0-9]|(\.|\-)[0-9]{2})/
		this.printTicket("3eestt")

		if (!this.state.checkIn && !this.state.checkOut) {
			const block = text.textBlocks.map(e => e.value)

			if (block.length > 0) {
				const data = block.join("")
				const plate = data.match(regEx)

				if (plate) {
					this.setState({checkIn: true})
					const plateStr = plate[0].replace("-","").replace("\n","-")
					
					Alert.alert("Checkin", plateStr, 
					[
						{
							text: "Cancel",
							onPress: () => {
								this.setState({checkIn: false})
							},
							style: "cancel"
						},
						{ 
							text: "OK", 
							onPress: () => {
								this.setState({checkIn: false})
								this.processCheckin(plateStr)
							}
						}
					])
				}
			}
		}
	}
	
	printTicket(plate) {
		var esc = '\x1B'; //ESC byte in hex notation
		var newLine = '\x0A'; //LF byte in hex notation
	
		var cmds = esc + "@"; //Initializes the printer (ESC @)
		cmds += esc + '!' + '\x38'; //Emphasized + Double-height + Double-width mode selected (ESC ! (8 + 16 + 32)) 56 dec => 38 hex
		cmds += 'BEST DEAL STORES'; //text to print
		cmds += newLine + newLine;
		cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
		cmds += 'COOKIES                   5.00'; 
		cmds += newLine;
		cmds += 'MILK 65 Fl oz             3.78';
		cmds += newLine + newLine;
		cmds += 'SUBTOTAL                  8.78';
		cmds += newLine;
		cmds += 'TAX 5%                    0.44';
		cmds += newLine;
		cmds += 'TOTAL                     9.22';
		cmds += newLine;
		cmds += 'CASH TEND                10.00';
		cmds += newLine;
		cmds += 'CASH DUE                  0.78';
		cmds += newLine + newLine;
		cmds += esc + '!' + '\x18'; //Emphasized + Double-height mode selected (ESC ! (16 + 8)) 24 dec => 18 hex
		cmds += '# ITEMS SOLD 2';
		cmds += esc + '!' + '\x00'; //Character font A selected (ESC ! 0)
		cmds += newLine + newLine;
		cmds += '11/03/13  19:53:17';

		console.log(cmds)
		
		this.manager.connectedDevices(["E0A4D442-2DAA-9FC7-B3AE-B9F17035BE57"]).then((device)=>{
			device.writeCharacteristicWithResponseForService(cmds)
		})
	}

	async processCheckin(plate) {
		const realm = await Realm.open({
			schema: [PlateData],
		})

		realm.write(() => {
			realm.create("Plate", {
				id: 1950,
				plateId: plate,
				code: "234fsdhjfsdfsak23k4jsdakchjas",
				checkinDate: Date().toString(),
				checkoutDate: "",
			});
		});

		console.log("oops")
		this.printTicket(plate)
	}

	async processCheckout(plate) {
		const realm = await Realm.open({
			schema: [PlateData],
		})

		const obj = realm.objects("Plate").filtered(`plateId == \"${plate}\"`)
		realm.write(() => {
			realm.delete(obj)
		})
	}

	render() {
		data = this.props.data

		const view =  (
			<SafeAreaView style={style.container}>
				<Header title="Scan plate or QR ticket" bgColor="#323232" titleColor="#ffffff"></Header>
				<View style={style.body}>
					<View style={[
						style.cameraView,
						{borderColor: (this.state.checkIn||this.state.checkOut) ? "#17db3c" : "#ffc500"}
					]}>
						<View style={style.cameraContent}>
							<RNCamera 
								ref = {(cam)=>this.camera = cam}
								
								captureAudio={false} 
								ref={ref => {
									this.camera = ref;
								}}
								defaultTouchToFocus
								style={[{flex: 1, borderRadius: 10, zIndex: 3}]}
								onBarCodeRead={this.onBarCodeRead.bind(this)}

								onTextRecognized={this.onTextRecognized.bind(this)}
							>
							</RNCamera>
						</View>
					</View>

				</View>
					
			</SafeAreaView>
		)

		return view
	}
}