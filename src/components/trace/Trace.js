import React, { Component } from 'react';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import Count from '../../components/count/Count';
import TraceTodayBmapChart from '../../components/traceTodayBmapChart/TraceTodayBmapChart';
import TraceHistoryBmapChart from '../../components/traceHistoryBmapChart/TraceHistoryBmapChart';
import './Trace.scss';

export class Trace extends Component {
	constructor(){
        super();
        this.state = {
        	todayCountData:{
        		maxStep: {number:5620000},
        		minStep: {number:568400},
        		maxDist: {number:586200},
        		minDist: {number:450000},
        		maxCal: {number:560000},
        		minCal: {number:23000},
        	}
        }
    }

	render() {
		return (
			<div className="main trace">
				<div className="left">
					<section className="count_section">
						<div className="title">
							今日新增
						</div>
						<Count data={this.state.todayCountData.maxStep} text={"最大行走步数"} unit={"步"} />
						<Count data={this.state.todayCountData.minStep} text={"最小行走步数"} unit={"步"} />
						<Count data={this.state.todayCountData.maxDist} text={"最大行走距离"} unit={"米"} />
						<Count data={this.state.todayCountData.minDist} text={"最小行走距离"} unit={"米"} />
						<Count data={this.state.todayCountData.maxCal} text={"最大消耗卡路里"} unit={"卡"} />
						<Count data={this.state.todayCountData.minCal} text={"最小消耗卡路里"} unit={"卡"} />

					</section>
					<section className="count_section">
						<div className="title">
							历史累计
						</div>
						<Count data={this.state.todayCountData.maxStep} text={"最大行走步数"} unit={"步"} />
						<Count data={this.state.todayCountData.minStep} text={"最小行走步数"} unit={"步"} />
						<Count data={this.state.todayCountData.maxDist} text={"最大行走距离"} unit={"米"} />
						<Count data={this.state.todayCountData.minDist} text={"最小行走距离"} unit={"米"} />
						<Count data={this.state.todayCountData.maxCal} text={"最大消耗卡路里"} unit={"卡"} />
						<Count data={this.state.todayCountData.minCal} text={"最小消耗卡路里"} unit={"卡"} />

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
						<TraceTodayBmapChart />
					</div>
					<div className="bottom">
						<TraceHistoryBmapChart />
					</div>
				</div>
			</div>
		);
	}
}

export default Trace;