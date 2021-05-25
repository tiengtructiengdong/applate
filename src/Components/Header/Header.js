import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const headerStyle = StyleSheet.create({
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

	},
	headerRightNav: {

	}
})

export function Header({bgColor='#d1d1d1', titleColor="#000000", title}) {
	return (
		<View style={[headerStyle.headerBg, {backgroundColor: bgColor}]}>
			<Text style={[headerStyle.headerText, {color: titleColor}]}>{title}</Text>
		</View>	
	)
}
