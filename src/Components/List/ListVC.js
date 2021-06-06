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
			return (<ListContent plateData={this.state.realm.objects("Plate")}/>)
		}
		return null
	}
}