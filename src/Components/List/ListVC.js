import React from 'react'

import {SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native'

import {Header} from '../Header/Header'
import {ListContent} from './ListContent/ListContent'
import {ListReport} from './ListReport'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Realm from 'realm'
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
			realm: null
		}
	}

	componentDidMount() {
		const navigation = this.props.navigation
		
		this._unsubscribe = navigation.addListener('focus', () => {
			this.forceUpdate()
		});
		this.LoadData()
	}

	LoadData() {
		Realm.open({schema: [PlateData]}).then((realm)=>{
			this.setState({
				plates: realm.objects("Plate")[0],
				realm: realm
			})
			this.forceUpdate()
		})
	}

	componentWillUnmount() {
		this._unsubscribe();
	}
	
	Home({navigation}) {
		return (
			<SafeAreaView style={[{backgroundColor: '#ffb500'}]}>
				<Header title="Plate list" bgColor="#ffb500"></Header>

				<ScrollView style={style.scrollView} contentContainerStyle={style.scrollContainer}>
					{this.listContent(this.state.realm, navigation)}
					<View style={style.scrollPadding}></View>
				</ScrollView>
  
			</SafeAreaView>
		)
	}

	ListReport({route, navigation}) {
        const { plateId, datetime } = route.params
		return (
			<ListReport navigation={navigation} plateId={plateId} datetime={datetime}></ListReport>
		)
	}

	render() {
		return (
			<Stack.Navigator headerMode='none'>
				<Stack.Screen name="Home" component={this.Home.bind(this)} navigation={this.props.navigation}/>
				<Stack.Screen name="ListReport" component={this.ListReport.bind(this)} navigation={this.props.navigation}/>
			</Stack.Navigator>
		) 
	}

	listContent(realm, navigation) {
		if (realm) {
			const data = realm.objects("Plate")
			if (true/*data.length > 0*/) {
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