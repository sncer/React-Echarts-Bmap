import React, { Component } from 'react';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import Count from '../../components/count/Count';
import TraceTodayBmapChart from '../../components/traceTodayBmapChart/TraceTodayBmapChart';
import TraceHistoryBmapChart from '../../components/traceHistoryBmapChart/TraceHistoryBmapChart';

import CityPicker from '../../components/cityPicker/CityPicker';
import AreaData from '../../js/utils/areaData.json';
import $ from 'jquery';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';
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
        	},
        	location: this.getInitLocation(),
            todayLinesData: [],
            historyLinesData: [],
            startDate: moment().subtract(7, 'days'),
			endDate: moment()
        }
        this.ajaxParam = {
        	url: '/poverty/getLrData',
        };
        this.ajax = null;
        this.ajax2 = null;
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
	    },()=>{this.getTodayData();this.getHistoryData()});
	}
	handleEvent = (event, picker) => {
        this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		},()=>{this.getHistoryData()});
    }
    handleClearAllClick = () => {
		this.ajax.abort();
		this.ajax2.abort();
		this.setState({
			startDate: moment().subtract(7, 'days'),
			endDate: moment(),
			location: this.getInitLocation(),
		},()=>{this.getTodayData();this.getHistoryData()})
	}
	componentDidMount(){
    	//获取今日数据，默认全国
    	this.getTodayData();
    	//获取历史数据
    	this.getHistoryData();
    }
    componentWillUnmount(){
		//终止ajax
		this.ajax.abort();
		this.ajax2.abort();
	}
	render() {
		const { location, todayCountData, todayLinesData, historyLinesData, startDate, endDate } = this.state;
		const start = startDate.format('YYYY/MM/DD');
		const end = endDate.format('YYYY/MM/DD');
		const label = start + ' - ' + end;
		return (
			<div className="main trace">
				<div className="left">
					<section className="count_section">
						<div className="title">
							今日新增
						</div>
						<Count data={todayCountData.maxStep} text={"最大行走步数"} unit={"步"} />
						<Count data={todayCountData.minStep} text={"最小行走步数"} unit={"步"} />
						<Count data={todayCountData.maxDist} text={"最大行走距离"} unit={"米"} />
						<Count data={todayCountData.minDist} text={"最小行走距离"} unit={"米"} />
						<Count data={todayCountData.maxCal} text={"最大消耗卡路里"} unit={"卡"} />
						<Count data={todayCountData.minCal} text={"最小消耗卡路里"} unit={"卡"} />

					</section>
					<section className="count_section">
						<div className="title">
							历史累计
						</div>
						<Count data={todayCountData.maxStep} text={"最大行走步数"} unit={"步"} />
						<Count data={todayCountData.minStep} text={"最小行走步数"} unit={"步"} />
						<Count data={todayCountData.maxDist} text={"最大行走距离"} unit={"米"} />
						<Count data={todayCountData.minDist} text={"最小行走距离"} unit={"米"} />
						<Count data={todayCountData.maxCal} text={"最大消耗卡路里"} unit={"卡"} />
						<Count data={todayCountData.minCal} text={"最小消耗卡路里"} unit={"卡"} />

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
							<button className="clearall-btn" onClick={this.handleClearAllClick}>清空</button>
						</div>
						<TraceTodayBmapChart data={todayLinesData} location={location} />
					</div>
					<div className="bottom">
			                <div className="daterangepicker-wrapper input-group">
								<DateRangePicker startDate={startDate} endDate={endDate} onEvent={this.handleEvent}>
			                		<div className="daterangepicker-content">
			                			{label}
			                		</div>
			           			</DateRangePicker>
			                </div>
						<TraceHistoryBmapChart data={historyLinesData} location={location} />
					</div>
				</div>
			</div>
		);
	}
	//获取并更新今日数据
    getTodayData() {
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
		        let data = res.dataObject;
		        this.setState({
		        	todayLinesData: this.covertLinesData(data.locusReplayDetailList || [])
		        })
		        
		    },
		    error: ()=>{
		    },
		    
		})
    }
    //获取并更新历史数据
    getHistoryData() {
		const { location, startDate, endDate } = this.state;
    	let ajaxData = {
    		poicId: location.province,
    		cityId: location.city,
    		cutyDsrcId: location.districtName,
    		startDate: startDate.format('YYYY-MM-DD'),
    		endDate: endDate.format('YYYY-MM-DD'),
    	}
    	this.ajax2 = $.ajax({
		    url: this.ajaxParam.url,
		    type: 'GET', 
		    data: ajaxData,
		    dataType:'json',
		    success: (res) => {
		        let data = res.dataObject;
		        this.setState({
		        	historyLinesData: this.covertLinesData(data.locusReplayDetailList || [])
		        })
		        
		    },
		    error: ()=>{
		    },
		    
		})
    }
    /**
    *功能：转化百度地图线路图数据
    *返回类型：Array
    *形式：[{
		    coords: [
		    		[120.14,30.23],
		    		[120.14,30.24],
		    	]
		    },
		    {
		    	coords: [
		    		[120.14,30.23],
		    		[120.14,30.24],
		    	]
		    }]
    **/
	covertLinesData(arr){
		let data = []
		if(arr.length > 0){
			arr.map((item,index)=>{
				if(item.locations.length > 0){
					data.push({
						coords: item.locations
					})
				}
			})
		}
		return data;
	}
}


export default Trace;