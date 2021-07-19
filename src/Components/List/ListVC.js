import React from 'react'
import DefaultPreference from 'react-native-default-preference';

import {SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native'

import {Header} from '../Header/Header'
import {ListContent} from './ListContent/ListContent'
import {ListReport} from './ListReport'
import {ListReportPDFView} from './ListReportPDFView'

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import Realm from 'realm';
const parkingLot = {
	name: 'parkingLot',
	properties: {
		id: {type : 'int'},
		plateId: {type : 'string'},
		code: {type : 'string'},
		checkinDate: {type : 'string'},
		state: {type : 'string'},
		updateOnlineLater: {type : 'bool'},
		isCheckedOut: {type : 'bool'},
	}
}

const style = StyleSheet.create({
	scrollView: {
		height: '100%',
		backgroundColor: "#ffffff"
	},

	scrollContainer: {
		marginTop: 15
	},

	scrollPadding: {
		height: 180
	},

	noVehicle: {
		alignItems: 'center',
		marginTop: '50%'
	},

	noVehicleLine: {
		fontWeight: '600',
		fontSize: 20,
		height: 35,
		color: '#787878'
	},

	noVehicleSubline: {
		fontWeight: '400',
		fontSize: 16,
		height: 35,
		color: '#787878'
	}
});

export class ListVC extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			realm: null,
			appMode: ''
		}
	}

	componentDidMount() {
		const navigation = this.props.navigation
		
		this._unsubscribe = navigation.addListener('focus', () => {
			DefaultPreference.get("appMode").then((mode)=>{
				this.setState({appMode: mode})
			}).catch((err)=> {
				console.log(err)
			})
			this.forceUpdate()
		});
		this.LoadData()
	}

	LoadData() {
		Realm.open({schema: [parkingLot]}).then((realm)=>{
			this.setState({
				plates: realm.objects("parkingLot")[0],
				realm: realm
			})

			fetch('https://cloud.mongodb.com/api/atlas/v1.0/groups/60e305202ae0b86829857edc/clusters/Cluster0', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}).then((response)=>console.log("(response)\n",response))
			.then((json)=>console.log("(json)\n",json))
			.catch((err)=>console.log(err))

			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this._unsubscribe();
	}
	
	Home({navigation}) {
		return (
			<SafeAreaView style={[{backgroundColor: '#ffb500'}]}>
				<Header title={"My Locations"} bgColor="#ffb500"></Header>

				<ScrollView style={style.scrollView} contentContainerStyle={style.scrollContainer}>
					{this.listContent(this.state.realm, navigation)}
					<View style={style.scrollPadding}></View>
				</ScrollView>
  
			</SafeAreaView>
		)
	}

	ListReport({route, navigation}) {
        const {plateId, datetime} = route.params
		return (
			<ListReport navigation={navigation} plateId={plateId} datetime={datetime} />
		)
	}

	ListReportPDFView({route, navigation}) {
        const {plateId, datetime} = route.params
		return (
			<ListReportPDFView navigation={navigation} plateId={plateId} datetime={datetime} />
		)
	}

	render() {
		return (
			<Stack.Navigator headerMode='none'>
				<Stack.Screen name="Home" component={this.Home.bind(this)} navigation={this.props.navigation}/>
				<Stack.Screen name="ListReport" component={this.ListReport.bind(this)} navigation={this.props.navigation}/>
				<Stack.Screen name="ListReportPDFView" component={this.ListReportPDFView.bind(this)} navigation={this.props.navigation}/>
			</Stack.Navigator>
		) 
	}

	listContent(realm, navigation) {
		if (realm) {
			const data = realm.objects("parkingLot")
			if (true/*data.length > 0*/) {
				console.log(data)
				return (<ListContent plateData={data} navigation={navigation}/>)
			}
			return (
				<View style={style.noVehicle}>
					<Text style={style.noVehicleLine}>No vehicles on the park!</Text>
					<Text style={style.noVehicleSubline}>Wait for some customers.</Text>
				</View>
			)
		}
		return null
	}
}