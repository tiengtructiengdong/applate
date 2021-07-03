import React from 'react';

import {ListCell} from './ListCell.js'

export class ListContent extends React.Component {
    constructor(props) {
        super(props)
    }
    
	render() {
		const plateData = this.props.plateData

        var content = []
        
        for (data of plateData) {
            content.push(
                <ListCell plate={data.plateId} datetime={data.checkinDate} state={data.state}
                    reportTicketLoss={(()=>this.props.navigation.navigate('ListReport', {
                        plateId: data.plateId,
                        datetime: data.datetime
                    }))} />
            )
        }
        content.push(
            <ListCell plate="52N4-9898" datetime="LOL" state="Repaired"
                reportTicketLoss={(()=>this.props.navigation.navigate('ListReport', {
                    plateId: "52N4-9898",
                    datetime: "1995-12-17T03:24:00"
                }))} />
        )
        return (content)
	}
}