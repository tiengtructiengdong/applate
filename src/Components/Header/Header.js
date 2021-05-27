import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const style = StyleSheet.create({
	headerBg: {
		height: 47,
		margin: 0
	},
	headerText: {
		alignSelf: 'center',
		fontSize: 17,
		fontWeight: '600',
		position: 'absolute',
		bottom: 12
	},
	headerLeftNav: {
		bottom: -7,
		left: 15
	},
	headerRightNav: {

	}
})

export function Header({bgColor='#d1d1d1', titleColor="#000000", title, goBack}) {
	let leftNav

	if (goBack) { 
		leftNav = (
			<TouchableOpacity style={style.headerLeftNav} onPress={goBack}>
				<Icon name="arrow-back-outline" size={30} color="#000000"/>
			</TouchableOpacity>
		)
	}

	return (
		<View style={[style.headerBg, {backgroundColor: bgColor}]}>
			{leftNav}
			<Text style={[style.headerText, {color: titleColor}]}>{title}</Text>
		</View>	
	)
}
