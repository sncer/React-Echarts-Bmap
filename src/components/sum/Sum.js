import React, { Component } from 'react';
import './Sum.scss';

export class Sum extends Component {
	constructor(props){
        super(props);
        this.state = {
            
        };
    }
	render() {
		return (
			<div className="component_sum">
				<span className="number"><strong>{this.props.data.number}</strong>{this.props.unit}</span>
				<span className={"percent "+(this.props.data.percent>0?"increase":"decrease")}><i className={"fa "+(this.props.data.percent>0?"fa-long-arrow-up":"fa-long-arrow-down")}></i>{Math.abs(this.props.data.percent)}%</span>
			</div>
		);
	}
}

export default Sum;