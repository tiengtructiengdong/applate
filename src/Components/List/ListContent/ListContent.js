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
            content.push(<ListCell plate={data.plateId} datetime={data.checkinDate}></ListCell>)
        }
        return (content)
	}
}