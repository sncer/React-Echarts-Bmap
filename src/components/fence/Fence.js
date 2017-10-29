import React, { Component } from 'react';
import Sum from '../../components/sum/Sum';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import LivestockPieChart from '../../components/livestockPieChart/LivestockPieChart';
import FenceBmapChart from '../../components/fenceBmapChart/FenceBmapChart';
import CityPicker from '../../components/cityPicker/CityPicker';
import AreaData from '../../js/utils/areaData.json';
// 引入全国344个市、区、州对应的数字编号, 和相关通用方法
import { CityMap, ProvinceMap, SpecialRegion, ProvinceNameMap, ProvinceCodeMap, getFullNameByName, getCodeByName } from '../../js/utils/geoMap';
import './Fence.scss';
// 引入jQuery（重要）
import $ from 'jquery';
import { sortBy } from '../../js/utils/comm.js';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
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
            fenceBmapChartData: [],
            fenceSelectData: [],
            rankBarChartData: [],
            location: this.getInitLocation(),
            curFence: this.getInitFence(),
        };
        this.ajaxParam = {
        	url: '/poverty/getEfSum',
        };
        this.ajax = null;  
    }
    getInitFence(){
    	return {
            	id: 0,
	            code: "",
	            name: "",
	            value: [],
	            coords: [],
	            type: "",
	            radius: 0,
	            location: "",
	            class: "",
	            provinceName: "",
	            cityName: "",
	            districtName: "",
	        }
    }
    getInitLocation(){
    	return {
            	province: '',
				provinceName: '',
				city: '',
				cityName: '',
				district: '',
				districtName: '',
            }
    }
    //cityPicker回调函数，更新地点
    handleLocationChange = (location) => {
    	// console.log(value)
	    this.setState({
	    	location: location
	    },()=>{this.getData()});
	}
	handleSelectChange = (e) => {
		//获取围栏id
		let id = e.target.value;
		if(id > 0){
			let fence = this.getFenceById(id);
			let location = this.getLocationByFence(fence);
			this.setState({
				curFence: fence,
				location: location,
			},()=>{this.getData()})
		}else{
			this.setState({
				curFence: this.getInitFence()
			},()=>{this.getData()})
		}
	}
	handleFenceClick = (fence) => {
		let location = this.getLocationByFence(fence);
		this.setState({
			curFence: fence,
			location: location,
		},()=>{this.getData()})
	}
	handleClearAllClick = () => {
		this.ajax.abort();
		this.setState({
			curFence: this.getInitFence(),
			location: this.getInitLocation(),
		},()=>{this.getData()})
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
		const { location, livestockPieChartData, fenceBmapChartData, 
			fenceSelectData, curFence, rankBarChartData } = this.state;
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
							<div className="select2-wrapper">
								<Select2
									value={ this.state.curFence.id }
									data={fenceSelectData}
									onChange={this.handleSelectChange}
									options={{
									    placeholder: '请选择围栏名称',
									}}
								/>
							</div>
							<button className="clearall-btn" onClick={this.handleClearAllClick}>清空</button>
						</div>
						<FenceBmapChart data={fenceBmapChartData} barData={rankBarChartData} location={location} curFence={curFence} onFenceClick={this.handleFenceClick} />
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
					fenceBmapChartData: this.convertBmapData(data.electricFenceExtendedList || []),
					fenceSelectData: this.convertSelectData(data.electricFenceExtendedList || []),
					rankBarChartData: this.convertBarData(data.povertyDataList || []),
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
    *功能：转化排名条形图数据
    *返回类型：Array
    *形式：[{value:135, name:'北京市'}]
    **/
    convertBarData(arr){
		let data = [];
		if(arr.length > 0){
			arr.map((item,index)=>{
				data.push({
					name: item.poicName,
					value: item.aiasCount
				});
			});
		}
		data.sort(sortBy('value',false))
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
					value: [],
					coords: this.convertCoords(item.lonLat),
					type: item.grazeShapeName === "多边形" ? "polygon" : "circle",
					radius: item.radius,
					location: item.areaFullName,
					class: item.grazeClassName,
					provinceName: item.poicName,
					cityName: item.cityName,
					districtName: item.cutyDsrcName,
				});
			});
			
    	}
    	return data;
    }
	/**
    *功能：返回多边形顶点坐标
    *返回类型：Array
    *形式：[[116.7,39.53],[103.73,36.03]]
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
    /**
    *功能：返回select2数据
    *返回类型：Array
    *形式：[{id:1, text:"围栏1"},{id:2, text:"围栏2"}]
    **/
    convertSelectData(arr){
    	let data = [{
    		id: 0,
    		text: '请选择围栏名称',
    	}]
    	if(arr.length > 0){
    		arr.map((item, index)=>{
    			data.push({
    				id: item.eetiFneId,
    				text: item.eetiFneName,
    			});
    		});
    	}
    	return data;
    }
    //根据id获取围栏信息
    getFenceById(id){
		let {fenceBmapChartData} = this.state;
		if(fenceBmapChartData.length > 0){
			for (var i = 0; i < fenceBmapChartData.length; i++) {
				if(fenceBmapChartData[i].id == id){
					let fence = fenceBmapChartData[i];
					return fence;
				}
			}
		}
		return {};
    }
    /**
    *功能：根据围栏所在省市县名称获取省市县的编码
    *返回类型：Object
    *形式：{
            	province: '',
				provinceName: '',
				city: '',
				cityName: '',
				district: '',
				districtName: '',
            }
    **/
    getLocationByFence(fence){
    	let { provinceName, cityName, districtName } = fence;
		//获取围栏所在省市县的编码
		let province = ProvinceCodeMap[provinceName];
		let city = CityMap[cityName];
		let district = "";
		let districtMap = AreaData[city];
		let location = {};
		for( let key in districtMap){
			if(districtMap[key] === districtName){
				district = key;
				break;
			}
		}
		if(province !== "" && provinceName !== ""){
			location.province = province;
			location.provinceName = provinceName;
			if(city !== "" && cityName !== ""){
				location.city = city;
				location.cityName = cityName;
				if(district !== "" && districtName !== ""){
					location.district = district;
					location.districtName = districtName;
				}else{
					location.district = '';
					location.districtName = '';
				}
			}else{
				location.city = '';
				location.cityName = '';
				location.district = '';
				location.districtName = '';
			}
		}else{
			location = this.getInitLocation()
		}
		return location;
    }
    
    
}

export default Fence;