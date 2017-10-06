import React, { Component } from 'react';
import moment from 'moment';
import './RefreshTime.scss';

class RefreshTime extends Component {
	constructor(){
		super();
		this.state = {
			time: ''
		}	
	}
	componentDidMount() {
		this.setState({
			time: moment().format('YYYY/MM/DD HH:mm')
		})
	}
	render() {
		return (
			<section className="component_refresh_time">
				最后刷新时间：{this.state.time}
			</section>
		);
	}
}

export default RefreshTime;