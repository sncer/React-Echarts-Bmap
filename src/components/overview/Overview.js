import React, { Component } from 'react';
import Sum from '../../components/sum/Sum';
import PieChart from '../../components/pieChart/PieChart';
import PictorialBarChart from '../../components/pictorialBarChart/PictorialBarChart';
import HeatMapChart from '../../components/heatMapChart/HeatMapChart';
import RankLineChart from '../../components/rankLineChart/RankLineChart';
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
					<div className="top">
						<div className="select_bar">
							<select>
								<option>请选择省</option>
								<option>山东省</option>
								<option>河北省</option>
								<option>山西省</option>
							</select>
							<select>
								<option>请选择市</option>
								<option>北京市</option>
								<option>上海市</option>
								<option>无锡市</option>
							</select>
						</div>
						<HeatMapChart />
					</div>
					<div className="bottom">
						
						<RankLineChart />
					</div>
				</div>
			</div>
		);
	}
}

export default Overview;