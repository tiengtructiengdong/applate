/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

 import React, {
	useState,
	useEffect,
  } from 'react';
  import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
	NativeModules,
	NativeEventEmitter,
	Button,
	Platform,
	PermissionsAndroid,
	FlatList,
	TouchableHighlight,
  } from 'react-native';
  
  import {
	Colors,
  } from 'react-native/Libraries/NewAppScreen';
  
  import BleManager from 'react-native-ble-manager';
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  
  const App = () => {
	const [isScanning, setIsScanning] = useState(false);
	const peripherals = new Map();
	const [list, setList] = useState([]);
  
  
	const startScan = () => {
	  if (!isScanning) {
		BleManager.scan([], 3, true).then((results) => {
		  console.log('Scanning...');
		  setIsScanning(true);
		}).catch(err => {
		  console.error(err);
		});
	  }    
	}
  
	const handleStopScan = () => {
	  console.log('Scan is stopped');
	  setIsScanning(false);
	}
  
	const handleDisconnectedPeripheral = (data) => {
	  let peripheral = peripherals.get(data.peripheral);
	  if (peripheral) {
		peripheral.connected = false;
		peripherals.set(peripheral.id, peripheral);
		setList(Array.from(peripherals.values()));
	  }
	  console.log('Disconnected from ' + data.peripheral);
	}
  
	const handleUpdateValueForCharacteristic = (data) => {
	  console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
	}
  
	const retrieveConnected = () => {
	  BleManager.getConnectedPeripherals([]).then((results) => {
		if (results.length == 0) {
		  console.log('No connected peripherals')
		}
		console.log(results);
		for (var i = 0; i < results.length; i++) {
		  var peripheral = results[i];
		  peripheral.connected = true;
		  peripherals.set(peripheral.id, peripheral);
		  setList(Array.from(peripherals.values()));
		}
	  });
	}
  
	const handleDiscoverPeripheral = (peripheral) => {
	  console.log('Got ble peripheral', peripheral);
	  if (!peripheral.name) {
		peripheral.name = 'NO NAME';
	  }
	  peripherals.set(peripheral.id, peripheral);
	  setList(Array.from(peripherals.values()));
	}
  
	const testPeripheral = (peripheral) => {
	  if (peripheral){
		if (peripheral.connected){
		  BleManager.disconnect(peripheral.id);
		}else{
		  BleManager.connect(peripheral.id).then(() => {
			let p = peripherals.get(peripheral.id);
			if (p) {
			  p.connected = true;
			  peripherals.set(peripheral.id, p);
			  setList(Array.from(peripherals.values()));
			}
			console.log('Connected to ' + peripheral.id);
  
  
			setTimeout(() => {
  
			  /* Test read current RSSI value */
			  BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
				console.log('Retrieved peripheral services', peripheralData);
  
				BleManager.readRSSI(peripheral.id).then((rssi) => {
				  console.log('Retrieved actual RSSI value', rssi);
				  let p = peripherals.get(peripheral.id);
				  if (p) {
					p.rssi = rssi;
					peripherals.set(peripheral.id, p);
					setList(Array.from(peripherals.values()));
				  }                
				});                                          
			  });
  
			  // Test using bleno's pizza example
			  // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
			  
			  BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
				console.log(peripheralInfo);
				/*
				{	"advertising": 
					{
						"isConnectable": 1, 
						"localName": "GB01", 
						"manufacturerData": {"CDVType": "ArrayBuffer", "bytes": [Array], "data": "2FBe4Ae9"}, 
						"serviceUUIDs": ["1812"]
					}, 
					"characteristics": [
						{"characteristic": "AE01", "isNotifying": false, "properties": [Array], "service": "AE00"}, 
						{"characteristic": "AE02", "isNotifying": false, "properties": [Array], "service": "AE00"}, 
						{"characteristic": "AE03", "isNotifying": false, "properties": [Array], "service": "AE00"}, 
						{"characteristic": "AE04", "isNotifying": false, "properties": [Array], "service": "AE00"}, 
						{"characteristic": "AE05", "isNotifying": false, "properties": [Array], "service": "AE00"}, 
						{"characteristic": "AE10", "isNotifying": false, "properties": [Array], "service": "AE00"}
					], 
					"id": "E0A4D442-2DAA-9FC7-B3AE-B9F17035BE57", "name": "GB01", "rssi": 127, "services": ["AE00"]}
				
				*/
				console.log(peripheralInfo.characteristics.map((x)=>x.properties))

				var esc = '\x1B'; //ESC byte in hex notation

					

				var cmds = [esc, '\x40', 'S', 'C', '\x1b','\x74','\x00', '\x1b','\x42','\x05','\x05', esc, '!', '\x38', 'B', 'E', 'S', 'T', '\x0a'].map((x)=>x.charAt(0))

				// [["WriteWithoutResponse"], ["Notify"], ["WriteWithoutResponse"], ["Notify"], ["Indicate"], ["Read", "Write"]]

				setTimeout(() => {
					BleManager.startNotification(
						peripheral.id, 
						peripheralInfo.characteristics[1].service, 
						peripheralInfo.characteristics[1].characteristic
					).then(() => {
						console.log('Enabled Notification');

						setTimeout(() => {
							BleManager.writeWithoutResponse(
								peripheral.id, 
								peripheralInfo.characteristics[0].service, 
								peripheralInfo.characteristics[0].characteristic, 
								cmds
							).then(() => {
								console.log('Writed NORMAL crust');

								setTimeout(() => {
									BleManager.write(
										peripheral.id, 
										peripheralInfo.characteristics[5].service, 
										peripheralInfo.characteristics[5].characteristic, 
										cmds
									).then(() => {
										console.log('Writed NORMAL crust');

										setTimeout(() => {
											BleManager.startNotification(
												peripheral.id, 
												peripheralInfo.characteristics[3].service, 
												peripheralInfo.characteristics[3].characteristic, 
												cmds
											).then(() => {
												console.log('Writed NORMAL crust');
				
												setTimeout(() => {
													BleManager.writeWithoutResponse(
														peripheral.id, 
														peripheralInfo.characteristics[2].service, 
														peripheralInfo.characteristics[2].characteristic, 
														cmds
													).then(() => {
														console.log('Writed NORMAL crust');
													});
								
												}, 300)
				
											})
						
										}, 200)

									});
				
								}, 300)

							})
		
						}, 200)

					});

				}, 500);
					
			  });
			}, 900);
		  }).catch((error) => {
			console.log('Connection error', error);
		  });
		}
	  }
  
	}
  
	useEffect(() => {
	  BleManager.start({showAlert: false});
  
	  bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
	  bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
	  bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
	  bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
  
	  if (Platform.OS === 'android' && Platform.Version >= 23) {
		PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
			if (result) {
			  console.log("Permission is OK");
			} else {
			  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
				if (result) {
				  console.log("User accept");
				} else {
				  console.log("User refuse");
				}
			  });
			}
		});
	  }  
	  
	  return (() => {
		console.log('unmount');
		bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
		bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
		bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
		bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
	  })
	}, []);
  
	const renderItem = (item) => {
	  const color = item.connected ? 'green' : '#fff';
	  return (
		<TouchableHighlight onPress={() => testPeripheral(item) }>
		  <View style={[styles.row, {backgroundColor: color}]}>
			<Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
			<Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
			<Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
		  </View>
		</TouchableHighlight>
	  );
	}
  
	return (
	  <>
		<StatusBar barStyle="dark-content" />
		<SafeAreaView>
		  <ScrollView
			contentInsetAdjustmentBehavior="automatic"
			style={styles.scrollView}>
			{global.HermesInternal == null ? null : (
			  <View style={styles.engine}>
				<Text style={styles.footer}>Engine: Hermes</Text>
			  </View>
			)}
			<View style={styles.body}>
			  
			  <View style={{margin: 10}}>
				<Button 
				  title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
				  onPress={() => startScan() } 
				/>            
			  </View>
  
			  <View style={{margin: 10}}>
				<Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
			  </View>
  
			  {(list.length == 0) &&
				<View style={{flex:1, margin: 20}}>
				  <Text style={{textAlign: 'center'}}>No peripherals</Text>
				</View>
			  }
			
			</View>              
		  </ScrollView>
		  <FlatList
			  data={list}
			  renderItem={({ item }) => renderItem(item) }
			  keyExtractor={item => item.id}
			/>              
		</SafeAreaView>
	  </>
	);
  };
  
  const styles = StyleSheet.create({
	scrollView: {
	  backgroundColor: Colors.lighter,
	},
	engine: {
	  position: 'absolute',
	  right: 0,
	},
	body: {
	  backgroundColor: Colors.white,
	},
	sectionContainer: {
	  marginTop: 32,
	  paddingHorizontal: 24,
	},
	sectionTitle: {
	  fontSize: 24,
	  fontWeight: '600',
	  color: Colors.black,
	},
	sectionDescription: {
	  marginTop: 8,
	  fontSize: 18,
	  fontWeight: '400',
	  color: Colors.dark,
	},
	highlight: {
	  fontWeight: '700',
	},
	footer: {
	  color: Colors.dark,
	  fontSize: 12,
	  fontWeight: '600',
	  padding: 4,
	  paddingRight: 12,
	  textAlign: 'right',
	},
  });
  
  export default App;
  

/*import React from 'react';

import {SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import {ListVC} from './Components/List/ListVC.js'
import {ScanVC} from './Components/Scan/ScanVC.js'
import {SettingsVC} from './Components/Settings/SettingsVC.js'

import {AppData} from "./Model/AppData.js"

import {AppTabbar} from "./Components/AppTabbar/AppTabbar.js"

var appData = new AppData()


function List({navigation}) {
	return (
		<ListVC data={appData} navigation={navigation}></ListVC>
	)
}

function Scan({navigation}) {
	return (
		<ScanVC data={appData} navigation={navigation}></ScanVC>
	)
}

function Settings({navigation}) {
	return (
		<SettingsVC data={appData} navigation={navigation}></SettingsVC>
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
*/