import React, {Component} from 'react';
import DefaultPreference from 'react-native-default-preference';

import {SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text, TextInput, View} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import {Header} from '../Header/Header'


const style = StyleSheet.create({
	container: {
		backgroundColor: '#ffb500'
	},
	cell: {
		borderBottomWidth: 1,
		borderTopWidth: 0,
		borderBottomColor: "#d0d0d0",
		backgroundColor: '#ffffff',
        justifyContent: 'center',
        minHeight: 50,
        overflow: 'hidden'
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
            name: "",
            price: 0,
            carPrice: 0,
            priceMode: "fixed"
        }
        DefaultPreference.get("name").then((name)=>{
            this.getName(name)
        })
        DefaultPreference.get("price").then((price)=>{
            this.getPrice(price)
        })
        DefaultPreference.get("carPrice").then((price)=>{
            this.getCarPrice(price)
        })
        DefaultPreference.get("priceMode").then((priceMode)=>{
            this.getPriceMode(priceMode)
        })
    }
    
    getName(name) {
        this.setState({name: name})
    }
    getPrice(price) {
        this.setState({price: price})
    }
    getCarPrice(price) {
        this.setState({carPrice: price})
    }
    getPriceMode(priceMode) {
        this.setState({priceMode: priceMode})
    }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <Header bgColor='#ffb500' title="Information" goBack={this.submit.bind(this)}></Header>
                <ScrollView style={style.scrollView} scrollEnabled={false}>
                    <View style={style.cell}>
                        <Text style={style.cellLabel}>Name</Text>
                        
                        <TextInput style={style.cellText} 
                            placeholder='APPLATE' 
                            returnKeyType='done' multiline={true}
                            onChangeText={this.getName.bind(this)}
                            onEndEditing={this.updateName.bind(this)}
                        >
                            {this.state.name}
                        </TextInput>
                    </View>
                    <View style={style.cell}>
                        <Text style={style.cellLabel}>Parking fee - Bikes</Text>
                        
                        <TextInput style={style.cellText} 
                            placeholder='0,000' 
                            returnKeyType='done' multiline={true}
                            onChangeText={this.getPrice.bind(this)}
                            onEndEditing={this.updatePrice.bind(this)}
                        >
                            {this.state.price}
                        </TextInput>
                    </View>
                    
                    <View style={style.cell}>
                        <Text style={style.cellLabel}>Parking fee - Cars</Text>
                        
                        <TextInput style={style.cellText} 
                            placeholder='0,000' 
                            returnKeyType='done' multiline={true}
                            onChangeText={this.getCarPrice.bind(this)}
                            onEndEditing={this.updateCarPrice.bind(this)}
                        >
                            {this.state.carPrice}
                        </TextInput>
                    </View>

                    <View style={[style.cell, {height: 50}]}>
                        <Picker selectedValue={this.state.priceMode} onValueChange={this.updatePriceMode.bind(this)}>
                            <Picker.Item label="Fixed price" value="fixed" />
                            <Picker.Item label="Hourly" value="hour" />
                            <Picker.Item label="Day" value="day" />
                        </Picker>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    submit() {
        this.props.navigation.goBack()
    }

    updateName() {
        DefaultPreference.set("name", this.state.name).then(()=>{})
    }

    updatePrice() {
        DefaultPreference.set("price", this.state.price).then(()=>{})
    }

    updateCarPrice() {
        DefaultPreference.set("carPrice", this.state.carPrice).then(()=>{})
    }

    updatePriceMode(val) {
        DefaultPreference.set("priceMode", val).then(()=>{
            DefaultPreference.get("priceMode").then((priceMode)=>{
                this.getPriceMode(priceMode)
            })
        })
    }
}