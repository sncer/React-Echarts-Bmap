import React, { Component } from 'react';
import Sum from '../../components/sum/Sum';
import PasturePieChart from '../../components/pasturePieChart/PasturePieChart';
import PictorialBarChart from '../../components/pictorialBarChart/PictorialBarChart';
import HeatMapChart from '../../components/heatMapChart/HeatMapChart';
import RankLineChart from '../../components/rankLineChart/RankLineChart';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import CityPicker from '../../components/cityPicker/CityPicker';
import AreaData from '../../js/utils/areaData.json';
import './Overview.scss';
import povertyImg from '../../img/poverty.png';

export class Overview extends Component {
	constructor(){
        super();
        this.state = {
        	rankIndex:0,
            sumData:{
            	pasture:{
            		number: 100000,
            		percent: 5.6,
            	},
            	herdsman:{
            		number: 256000,
            		percent: -1.6,
            	},
            	livestock:{
            		number: 156000,
            		percent: -0.6,
            	}
            },
            pasturePieChart:[
            	{value:335, name:'春牧场'},
                {value:310, name:'夏牧场'},
                {value:234, name:'秋牧场'},
                {value:135, name:'冬牧场'}
            ],
            pictorialBarChartData:[
            	{value:335, name:'山羊'},
                {value:310, name:'绵羊'},
                {value:234, name:'马'},
                {value:234, name:'牛'},
                {value:135, name:'骆驼'}
            ],
            rankLineChartData: [
				{value:385, name:'河北'},
				{value:325, name:'天津'},
				{value:305, name:'北京'},
				{value:268, name:'辽宁'},
				{value:205, name:'山东'},
				{value:175, name:'青海'},
				{value:145, name:'西藏'},
				{value:113, name:'宁夏'},
				{value:101, name:'湖南'},
				{value:68, name:'山西'},
				{value:25, name:'重庆'}
            ]
        };
    }
    handleCityPickerChange = (value) => {
	    console.log(value)
	  }
    changeRankIndex(index,e) {
    	
    	this.setState({
    		rankIndex: index,
    	})
    }
	render() {
		return (
			<div className="main overview">
				<div className="left">
					<section className="sum_section">
						<div className="sum">
							<div className="title">牧场总数</div>
							<Sum data={this.state.sumData.pasture} unit={'个'} />
						</div>
						<PasturePieChart data={this.state.pasturePieChart} />
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">牧户总数</div>
							<Sum data={this.state.sumData.herdsman} unit={'户'} />
						</div>
						<div className="img-wrap">
							<img src={povertyImg} alt=""/>
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">畜牧总数</div>
							<Sum data={this.state.sumData.livestock} unit={'头'} />
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">牲畜种类</div>
							<PictorialBarChart data={this.state.pictorialBarChartData} />
						</div>
					</section>
					<RefreshTime />
				</div>
				<div className="right">
					<div className="top">
						<div className="select_bar">
							<CityPicker
					          source={AreaData}
					          onOptionChange={this.handleCityPickerChange} />
						</div>
						<div className="rank_list">
							<div className="title"><i></i>各省牲畜数排名</div>
							<ul className="list">
								<li><i>1</i>广东省</li>
								<li><i>2</i>河北省</li>
								<li><i>3</i>贵州省</li>
								<li><i>4</i>吉林省</li>
								<li><i>5</i>江西省</li>
								<li><i>6</i>福建省</li>
								<li><i>7</i>安徽省</li>
								<li><i>8</i>广西省</li>
								<li><i>9</i>甘肃省</li>
								<li><i>10</i>河南省</li>
							</ul>
						</div>
						<HeatMapChart />
					</div>
					<div className="bottom">
						<div className="button_group">
							<button onClick={(e)=>this.changeRankIndex(0,e)} className={this.state.rankIndex == 0?"active":""}>牲畜</button>
							<button onClick={(e)=>this.changeRankIndex(1,e)} className={this.state.rankIndex == 1?"active":""}>牧户</button>
							<button onClick={(e)=>this.changeRankIndex(2,e)} className={this.state.rankIndex == 2?"active":""}>牧场</button>
						</div>
						<RankLineChart data={this.state.rankLineChartData} />
					</div>
				</div>
			</div>
		);
	}
}

export default Overview;