import React, { Component } from 'react';
import Sum from '../../components/sum/Sum';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import LivestockPieChart from '../../components/livestockPieChart/LivestockPieChart';
import FenceMapChart from '../../components/fenceBmapChart/FenceBmapChart';
import './Fence.scss';
export class Fence extends Component {
	constructor(){
        super();
        this.state = {
            sumData:{
            	herdsman:{
            		number: 6924,
            		percent: 5.6,
            	},
            	camera:{
            		number: 253,
            		percent: -1.6,
            	},
            	fence:{
            		number: 34,
            		percent: -0.6,
            	},
            	livestock:{
            		number: 156000,
            		percent: -0.6,
            	},
            },
            livestockPieChartData:[
                {value:135, name:'山羊'},
                {value:1048, name:'牛'},
                {value:251, name:'骆驼'},
                {value:147, name:'马'},
                {value:102, name:'绵羊'}
            ]
,
            
        };
    }
	render() {
		return (
			<div className="main fence">
				<div className="left">
					<section className="sum_section">
						<div className="sum">
							<div className="title">牧户总数</div>
							<Sum data={this.state.sumData.herdsman} unit={'户'} />
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">摄像头总数</div>
							<Sum data={this.state.sumData.camera} unit={'个'} />
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">圈棚总数</div>
							<Sum data={this.state.sumData.fence} unit={'个'} />
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">牲畜总数</div>
							<Sum data={this.state.sumData.livestock} unit={'头'} />
						</div>
						<LivestockPieChart data={this.state.livestockPieChartData} />
					</section>
					
					<RefreshTime />
				</div>
				<div className="right">
					<div className="whole">
						<div className="select_bar">
							<select>
								<option>请选择省</option>
								<option>山东省</option>
								<option>河北省</option>
								<option>山西省</option>
							</select>
							
						</div>
						<FenceMapChart />
					</div>
					
				</div>
			</div>
		);
	}
}

export default Fence;