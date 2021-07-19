import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ListCell} from './ListCell.js'

const styles = StyleSheet.create({
	header: {
		height: 40,
        paddingHorizontal: 25,
        justifyContent: 'center'
	},
    headerText: {
        fontSize: 18,
        fontWeight: '300',
    }
})

export class ListContent extends React.Component {
    constructor(props) {
        super(props)
    }
    
	render() {
		const plateData = this.props.plateData

        var content = []
        
        content.push(
            <View style={styles.header}>
                <Text style={styles.headerText}>My Location</Text>
            </View>
        )

        for (data of plateData) {
            content.push(
                <ListCell 
                    plate={data.plateId} datetime={data.checkinDate} state={data.state} 
                    realm={data.realm} mobile={data.mobile}
                    reportTicketLoss={(()=>this.props.navigation.navigate('ListReport', {
                        plateId: data.plateId,
                        datetime: data.datetime
                    }))} />
            )
        }
        // content.push(
        //     <ListCell plate="52LD-9898" datetime="LOL" state="Repaired"
        //         reportTicketLoss={(()=>this.props.navigation.navigate('ListReport', {
        //             plateId: "52LD-9898",
        //             datetime: "2018-12-17T03:24:00"
        //         }))} />
        // )
        return (content)
	}
}