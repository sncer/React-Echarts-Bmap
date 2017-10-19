import React, { Component } from 'react';
import Sum from '../../components/sum/Sum';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import LivestockPieChart from '../../components/livestockPieChart/LivestockPieChart';
import FenceBmapChart from '../../components/fenceBmapChart/FenceBmapChart';
import CityPicker from '../../components/cityPicker/CityPicker';
import AreaData from '../../js/utils/areaData.json';
import './Fence.scss';
// 引入jQuery（重要）
import $ from 'jquery';
import { sortBy } from '../../js/utils/comm.js';

export class Fence extends Component {
	constructor(){
        super();
        this.state = {
            sumData:{
            	herdsman:{
            		number: 0,
            		percent: 0,
            	},
            	camera:{
            		number: 0,
            		percent: 0,
            	},
            	fence:{
            		number: 0,
            		percent: 0,
            	},
            	livestock:{
            		number: 0,
            		percent: 0,
            	},
            },
            livestockPieChartData: [],
            FenceBmapChartData: [],
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
        	url: '/smartGraze/poverty/getEfSum',
        };
        this.ajax = null;  


    }
    //cityPicker回调函数，更新地点
    handleLocationChange = (value) => {
    	// console.log(value)
	    this.setState({
	    	location: value
	    },()=>{this.getData()});
	}
	componentDidMount(){
    	//获取数据，默认全国
    	this.getData();
    }
	componentWillUnmount(){
		//终止ajax
		this.ajax.abort();
	}
	render() {
		const { location, livestockPieChartData, FenceBmapChartData } = this.state;
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
						<LivestockPieChart data={livestockPieChartData} />
					</section>
					
					<RefreshTime />
				</div>
				<div className="right">
					<div className="whole">
						<div className="select_bar">
							<CityPicker
								selectedProvince = {location.province}
								selectedCity = {location.city}
								selectedDistrict = {location.district}
								source = {AreaData}
								onOptionChange = {this.handleLocationChange} />
							
						</div>
						<FenceBmapChart data={FenceBmapChartData} />
					</div>
					
				</div>
			</div>
		);
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
		        		herdsman:{
		            		number: data.herdCount || 0,
		            		percent: data.herfPercent || 0,
		            	},
		        		camera:{
		            		number: data.camCount || 0,
		            		percent: data.camPercent || 0,
		            	},
		            	fence:{
		            		number: data.coveredCount || 0,
		            		percent: data.coverPercent || 0,
		            	},
		            	livestock:{
		            		number: data.aiasCount || 0,
		            		percent: data.aiasPercent || 0,
		            	},
		        	},
		        	livestockPieChartData: this.convertPieData(data.povertyAiasDataList || []),
					FenceBmapChartData: this.convertBmapData(data.electricFenceExtendedList || []),
		        })
		        
		    },
		    error: ()=>{
		    },
		    
		})
    }
    /**
    *功能：转化畜牧类型饼图数据
    *返回类型：Array
    *形式：[{value:135, name:'牛'}]
    **/
    convertPieData(arr){
		let data = [];
		if(arr.length > 0){
			arr.map((item,index)=>{
				data.push({
					name: item.dicName,
					value: item.aiasCount
				});
			});
		}
		return data;
    }
	/**
    *功能：转化百度地图数据
    *返回类型：Array
    *形式：[{...},{...},{...}]
    **/
    convertBmapData(arr){
    	let data = [];
    	if(arr.length > 0){
			arr.map((item,index)=>{
				data.push({
					id: item.eetiFneId,
					code: item.eetiFneCode,
					name: item.eetiFneName,
					// value: [],
					coords: this.convertCoords(item.lonLat),
					type: item.grazeShapeName === "多边形" ? "polygon" : "circle",
					radius: item.radius,
					location: item.areaFullName,
					class: item.grazeClassName,
				});
			});
			
    	}
    	return data;
    }
	/**
    *功能：返回多边形顶点坐标
    *返回类型：Array
    *形式：[
                [116.7,39.53],
                [103.73,36.03],
            ]
    **/
    convertCoords(str){
    	let coords = []
    	if(str !== null && str.length > 0){
			let arr = str.split(',');
			if(arr.length > 0){
				arr.map((item,index)=>{
					let temp = item.split('-');
					coords.push([temp[0],temp[1]]);
				});
			}
    	}
    	return coords;
    }
    
}

export default Fence;