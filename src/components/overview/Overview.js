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
            rankListData:[],
            location:{
            	province: '',
				provinceName: '',
				city: '',
				cityName: '',
				district: '',
				districtName: '',
            },
        };
        this.ajaxParam = {
        	url: '/smartGraze/poverty/getSortAiasByProvince',
        	rankUrl: '/smartGraze/poverty/getSortByThing',
        };
        this.ajax = null;
    }
    //cityPicker回调函数，更新地点
    handleLocationChange = (value) => {
    	// console.log(value)
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
		if(arr.length > 0){
			arr.map((item,index)=>{
				data.push({
					name: item.dicName,
					value: item.aiasCount
				});
			});
			data.sort(sortBy('value'))
		}
		return data;
    }
    /**
    *功能：转化牧场类型饼图数据
    *返回类型：Array
    *形式：[{value:135, name:'春牧场'}]
    **/
    convertPieData(arr){
		let data = [];
		if(arr.length > 0){
			arr.map((item,index)=>{
				data.push({
					name: item.efNameClass + '牧场',
					value: item.efCount
				});
			});
		}
		return data;
    }
    /**
    *功能：转化Echarts地图数据
    *返回类型：Array
    *形式：[{value:135, name:'北京市'}]
    **/
    convertMapData(arr){
		let data = [];
		if(arr.length > 0){
			arr.map((item,index)=>{
				data.push({
					name: item.poicName,
					value: item.aiasCount
				});
			});
		}
		
		return data;
    }
    /**
    *功能：获取排名数据，取前十
    *返回类型：Array
    *形式：[{value:135, name:'北京市'}]
    **/
    convertRankListData(arr){
    	let data = [];
		if(arr.length > 0){
			arr.map((item,index)=>{
				data.push({
					name: item.poicName,
					value: item.aiasCount
				});
			});
		}
		
		data.sort(sortBy('value'))
		return data.slice(0,10);
    }
    //获取排行列表名称
    getRankListTitle(){
		const { location } = this.state;
		if(location.province === ''){
			return "各省"
		}else if (location.city === ''){
			return "各市"
		}else{
			return "各县"
		}
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
		        	pictorialBarChartData: this.convertBarData(data.povertyAiasDataList || []),
		        	pasturePieChartData: this.convertPieData(data.efDataList || []),
		        	heatMapChartData: this.convertMapData(data.povertyDataList || []),
		        	rankListData: this.convertRankListData(data.povertyDataList || []),
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
		        	rankLineChartData: this.convertBarData(data.povertyAiasDataList || []),
		        })
		        
		    },
		    error: ()=>{
		    },
		    
		})
    }
    getRankChartTitle(){
    	const { location, rankIndex } = this.state;
    	const rankType = ["","牲畜", "牧户","牧场"];
    	if(location.province === ''){
			return "全国所有省排名"
		}else if (location.city === ''){
			return location.provinceName + "所有市排名"
		}else{
			return location.cityName + "所有县排名"
		}
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
		const { sumData, location, rankListData, rankIndex, 
			rankLineChartData, pasturePieChartData, 
			pictorialBarChartData, heatMapChartData } = this.state;
		return (
			<div className="main overview">
				<div className="left">
					<section className="sum_section">
						<div className="sum">
							<div className="title">牧场总数</div>
							<Sum data={sumData.pasture} unit={'个'} />
						</div>
						<PasturePieChart data={pasturePieChartData} />
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">牧户总数</div>
							<Sum data={sumData.herdsman} unit={'户'} />
						</div>
						<div className="img-wrap">
							<img src={povertyImg} alt=""/>
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">畜牧总数</div>
							<Sum data={sumData.livestock} unit={'头'} />
						</div>
					</section>
					<section className="sum_section">
						<div className="sum">
							<div className="title">牲畜种类</div>
							<PictorialBarChart data={pictorialBarChartData} />
						</div>
					</section>
					<RefreshTime />
				</div>
				<div className="right">
					<div className="top">
						<div className="select_bar">
							<CityPicker
								selectedProvince = {location.province}
								selectedCity = {location.city}
								selectedDistrict = {location.district}
								source = {AreaData}
								onOptionChange = {this.handleLocationChange} />
						</div>
						<div className="rank_list">
							<div className="title"><i></i>{this.getRankListTitle()}牲畜数排名</div>
							<ul className="list">
							{rankListData.length > 0 ?
								rankListData.map((item,index)=>{
									return <li key={index}><i>{index+1}</i>{item.name}</li>
								}) : null
							}
							</ul>
						</div>
						<HeatMapChart data={heatMapChartData} location={location} onClickHandler={this.handleLocationChange} />
					</div>
					<div className="bottom">
						<div className="button_group">
							<button onClick={(e)=>this.changeRankIndex(1,e)} className={rankIndex == 1?"active":""}>牲畜</button>
							<button onClick={(e)=>this.changeRankIndex(2,e)} className={rankIndex == 2?"active":""}>牧户</button>
							<button onClick={(e)=>this.changeRankIndex(3,e)} className={rankIndex == 3?"active":""}>牧场</button>
						</div>
						<RankLineChart data={rankLineChartData} title={this.getRankChartTitle()} />
					</div>
				</div>
			</div>
		);
	}
}

export default Overview;