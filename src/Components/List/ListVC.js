import React from 'react'

import {SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native'

import {Header} from '../Header/Header.js'
import {ListContent} from './ListContent/ListContent.js'

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

	static getDerivedStateFromProps(props, current_state) {
		return {
			plates: props.data.plates
		}
	}

	componentDidMount() {
		const navigation = this.props.navigation
		
		this._unsubscribe = navigation.addListener('focus', () => {
			this.forceUpdate()
		});
		this.LoadData()
	}

	async LoadData() {
		const realm = await Realm.open({
			schema: [PlateData],
		})
		this.setState({
			plates: realm.objects("Plate")[0],
			realm: realm
		})
		this.forceUpdate()
	}

	componentWillUnmount() {
		this._unsubscribe();
	}
	
	render() {
		return (
			<SafeAreaView style={[{backgroundColor: '#ffb500'}]}>
				<Header title="Plate list" bgColor="#ffb500"></Header>

				<ScrollView style={style.scrollView} contentContainerStyle={style.scrollContainer}>
					{this.listContent(this.state.realm)}
					<View style={style.scrollPadding}></View>
				</ScrollView>
  
			</SafeAreaView>
		) 
	}

	listContent(realm) {
		if (realm) {
			const data = realm.objects("Plate")
			if (data.length > 0) {
				return (<ListContent plateData={data}/>)
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