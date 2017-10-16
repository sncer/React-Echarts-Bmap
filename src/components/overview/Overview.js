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
// 引入jQuery（重要）
import $ from 'jquery';
import { sortBy } from '../../js/utils/comm.js';

export class Overview extends Component {
	constructor(){
        super();
        this.state = {
        	rankIndex:1,	//数据类型 1:牲畜;2:牧户;3:牧场
            sumData:{
            	pasture:{
            		number: 0,
            		percent: 0,
            	},
            	herdsman:{
            		number: 0,
            		percent: 0,
            	},
            	livestock:{
            		number: 0,
            		percent: 0,
            	}
            },
            heatMapChartData: [],
            pasturePieChartData:[],
            pictorialBarChartData:[],
            rankLineChartData: [],
            location:{
            	province: '',
				provinceName: '',
				city: '',
				cityName: '',
				district: '',
				districtName: '',
            }
        };
        this.ajaxParam = {
        	url: '/smartGraze/poverty/getSortAiasByProvince',
        	rankUrl: '/smartGraze/poverty/getSortByThing',
        };
        this.ajax = null;
    }
    //cityPicker回调函数，更新地点
    handleLocationChange = (value) => {
	    this.setState({
	    	location: value
	    },()=>{this.getData();this.getRankData();});
	}
	//切换数据类型
    changeRankIndex(index,e) {
    	
    	this.setState({
    		rankIndex: index,
    	},()=>{this.getRankData();})
    }
    /**
    *功能：转化数据
    *返回类型：Array
    *形式：[{value:135, name:'骆驼'}]
    **/
    convertBarData(arr){
		let data = [];
		arr.map((item,index)=>{
			data.push({
				name: item.dicName,
				value: item.aiasCount
			});
		});
		data.sort(sortBy('value'))
		return data;
    }
    /**
    *功能：转化牧场类型饼图数据
    *返回类型：Array
    *形式：[{value:135, name:'春牧场'}]
    **/
    convertPieData(arr){
		let data = [];
		arr.map((item,index)=>{
			data.push({
				name: item.efNameClass + '牧场',
				value: item.efCount
			});
		});
		return data;
    }
    /**
    *功能：转化Echarts地图数据
    *返回类型：Array
    *形式：[{value:135, name:'北京市'}]
    **/
    convertMapData(arr){
		let data = [];
		arr.map((item,index)=>{
			data.push({
				name: item.poicName,
				value: item.aiasCount
			});
		});
		return data;
    }
    //获取并更新数据
    getData() {
		const { location } = this.state;
    	let ajaxData = {
    		poicId: location.province,
    		cityId: location.city,
    		cutyDsrcId: location.districtName
    	}
    	this.ajax = $.ajax({
		    url: this.ajaxParam.url,
		    type: 'GET', 
		    data: ajaxData,
		    dataType:'json',
		    success: (res) => {
		        // console.log(res)
		        let data = res.dataObject;
		        this.setState({
		        	sumData: {
		        		pasture:{
		            		number: data.efCount || 0,
		            		percent: data.efPercent || 0,
		            	},
		            	herdsman:{
		            		number: data.herdCount || 0,
		            		percent: data.herfPercent || 0,
		            	},
		            	livestock:{
		            		number: data.aiasCount || 0,
		            		percent: data.aiasPercent || 0,
		            	}
		        	},
		        	pictorialBarChartData: this.convertBarData(data.povertyAiasDataList),
		        	pasturePieChartData: this.convertPieData(data.efDataList),
		        	heatMapChartData: this.convertMapData(data.povertyDataList),
		        })
		        
		    },
		    error: ()=>{
		    },
		    
		})
    }
    //获取并更新排名折线图数据
    getRankData() {
		const { location, rankIndex } = this.state;
    	let ajaxData = {
    		poicId: location.province,
    		cityId: location.city,
    		cutyDsrcId: location.districtName,
    		sortClass: rankIndex
    	}
    	this.rankAjax = $.ajax({
		    url: this.ajaxParam.rankUrl,
		    type: 'GET', 
		    data: ajaxData,
		    dataType:'json',
		    success: (res) => {
		        // console.log(res)
		        let data = res.dataObject;
		        this.setState({
		        	rankLineChartData: this.convertBarData(data.povertyAiasDataList),
		        })
		        
		    },
		    error: ()=>{
		    },
		    
		})
    }
    componentDidMount(){
    	//获取数据，默认全国
    	this.getData();
    	//获取排名数据，默认全国
    	this.getRankData();

    }
	componentWillUnmount(){
		//终止ajax
		this.ajax.abort();
		this.rankAjax.abort();
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
						<PasturePieChart data={this.state.pasturePieChartData} />
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
								selectedProvince = {this.state.location.province}
								selectedCity = {this.state.location.city}
								selectedDistrict = {this.state.location.district}
								source = {AreaData}
								onOptionChange = {this.handleLocationChange} />
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
						<HeatMapChart data={this.state.heatMapChartData} location={this.state.location} onClickHandler={this.handleLocationChange} />
					</div>
					<div className="bottom">
						<div className="button_group">
							<button onClick={(e)=>this.changeRankIndex(1,e)} className={this.state.rankIndex == 1?"active":""}>牲畜</button>
							<button onClick={(e)=>this.changeRankIndex(2,e)} className={this.state.rankIndex == 2?"active":""}>牧户</button>
							<button onClick={(e)=>this.changeRankIndex(3,e)} className={this.state.rankIndex == 3?"active":""}>牧场</button>
						</div>
						<RankLineChart data={this.state.rankLineChartData} />
					</div>
				</div>
			</div>
		);
	}
}

export default Overview;