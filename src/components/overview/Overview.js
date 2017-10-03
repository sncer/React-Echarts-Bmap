import React, { Component } from 'react';
import Sum from '../../components/sum/Sum';
import PieChart from '../../components/pieChart/PieChart';
import PictorialBarChart from '../../components/pictorialBarChart/PictorialBarChart';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import './Overview.scss';
import povertyImg from '../../img/poverty.png';

export class Overview extends Component {
	render() {
		return (
			<div className="main overview">
				<div className="left">
					<section className="sum_section">
						<div className="sum">
							<div className="title">牧场总数</div>
							<Sum />
						</div>
						<PieChart />
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">牧户总数</div>
							<Sum />
						</div>
						<div className="img-wrap">
							<img src={povertyImg} alt=""/>
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">畜牧总数</div>
							<Sum />
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">牲畜种类</div>
							<PictorialBarChart />
						</div>
					</section>
					<RefreshTime />
				</div>
				<div className="right">
					
				</div>
			</div>
		);
	}
}

export default Overview;