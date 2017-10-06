import React, { Component } from 'react';
import './Count.scss';

export class Count extends Component {
	constructor(props){
        super(props);
        this.state = {
            
        };
    }
    getPercentHtml(){
    	if(this.props.data.percent){
    		return <span className={"percent "+(this.props.data.percent>0?"increase":"decrease")}><i className={"fa "+(this.props.data.percent>0?"fa-long-arrow-up":"fa-long-arrow-down")}></i>{Math.abs(this.props.data.percent)}%</span>
    	}else{
    		return '';
    	}
    }
	render() {
		return (
			<div className="component_count">
				<span className="text">{this.props.text}</span>
				<span className="number"><strong>{this.props.data.number}</strong>{this.props.unit}</span>
				{this.getPercentHtml()}
			</div>
		);
	}
}

export default Count;