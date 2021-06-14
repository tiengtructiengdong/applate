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
		bottom: 8,
		left: 15,
		position: 'absolute'
	},
	headerRightNav: {
		bottom: 8,
		right: 15,
		position: 'absolute'
	}
})

export function Header({bgColor='#d1d1d1', titleColor="#000000", title, goBack, goRight, iconRight="print-outline", bright=false}) {
	let leftNav
	let rightNav

	if (goBack) { 
		leftNav = (
			<TouchableOpacity style={style.headerLeftNav} onPress={goBack}>
				<Icon name="arrow-back-outline" size={30} color={bright?'#ffffff':'#000000'} />
			</TouchableOpacity>
		)
	}

	if (goRight) { 
		rightNav = (
			<TouchableOpacity style={style.headerRightNav} onPress={goRight}>
				<Icon name={iconRight} size={30} color={bright?'#ffffff':'#000000'} />
			</TouchableOpacity>
		)
	}

	return (
		<View style={[style.headerBg, {backgroundColor: bgColor}]}>
			{leftNav}
			{rightNav}
			<Text style={[style.headerText, {color: titleColor}]}>{title}</Text>
		</View>	
	)
}
