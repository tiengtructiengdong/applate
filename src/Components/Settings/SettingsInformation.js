import React, {Component} from 'react';

import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, View} from 'react-native';
import DefaultPreference from 'react-native-default-preference';

import {Header} from '../Header/Header.js'

const style = StyleSheet.create({
	container: {
		backgroundColor: '#ffb500'
	},
	cell: {
		borderBottomWidth: 1,
		borderTopWidth: 0,
		borderBottomColor: "#d0d0d0",
		backgroundColor: '#ffffff',
        justifyContent: 'center'
	},
	cellLabel: {
		fontWeight: '700',
		fontSize: 17,
		marginLeft: 25,
        position: 'absolute',
	},
    cellText: {
		fontWeight: '400',
		fontSize: 17,
        marginLeft: 120,
        marginRight: 16,
		textAlign: 'right',
        //backgroundColor: '#ff505050',
	},
	scrollView: {
		height: '100%',
		backgroundColor: "#ffffff"
	},
	bold: {
		fontSize: 30,
		fontWeight: '600',
		paddingBottom: 10
	},
	regular: {
		fontSize: 17,
		fontWeight: '400',
		paddingBottom: 8
	}
});

export default class SettingsInformation extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ""
        }
        DefaultPreference.get("name").then((name)=>{
            this.getName(name)
        })
    }
    
    getName(name) {
        this.setState({name: name})
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <Header bgColor='#ffb500' title="Information" goBack={this.submit.bind(this)}></Header>
                <ScrollView style={style.scrollView}>
                    <View style={style.cell}>
                        <Text style={style.cellLabel}>Name</Text>
                        
                        <TextInput style={style.cellText} 
                            placeholder='APPLATE' 
                            returnKeyType='done' multiline={true}
                            onChangeText={this.getName.bind(this)}
                            onEndEditing={this.update.bind(this)}
                        >
                            {this.state.name}
                        </TextInput>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    update() {
        DefaultPreference.set("name", this.state.name).then(()=>{
            console.log("Updated name=",this.state.name)
        })
    }

    submit() {
        this.props.navigation.goBack()
    }
}