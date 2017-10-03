import React, { Component } from 'react';
import './Sum.scss';

export class Sum extends Component {
	render() {
		return (
			<div className="component_sum">
				<span className="number"><strong>100000</strong>个</span>
				<span className="percentage increase"><i className="fa fa-long-arrow-up"></i>5.6%</span>
			</div>
		);
	}
}

export default Sum;