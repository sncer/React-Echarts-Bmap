import React, { Component } from 'react';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import Count from '../../components/count/Count';
import NoticeMapChart from '../../components/noticeMapChart/NoticeMapChart';
import './Notice.scss';
import $ from 'jquery';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';
export class Notice extends Component {
	constructor(){
        super();
        this.state = {
        	warnCountData:{
        		firstWarn: {number:0, percent:0},
        		secondWarn: {number:0, percent:0},
        		thirdWarn: {number:0, percent:0},
        	},
        	location:{
            	province: '',
				provinceName: '',
				city: '',
				cityName: '',
				district: '',
				districtName: '',
            },
        	noticeData: [],
        	startDate: moment(),
			endDate: moment(),
        };
        this.ajaxParam = {
        	url: '/poverty/getAlarmSumData',
        };
        this.ajax = null;
    }
    handleEvent = (event, picker) => {
        this.setState({
			startDate: picker.startDate,
			endDate: picker.endDate
		},()=>{this.getData()});
    }
    componentDidMount(){
    	//获取今日数据，默认全国
    	this.getData();
    	
    }
    componentWillUnmount(){
		//终止ajax
		this.ajax.abort();
	}
	render() {
		const { warnCountData, noticeData, startDate, endDate } = this.state;
		const start = startDate.format('YYYY/MM/DD');
		const end = endDate.format('YYYY/MM/DD');
		const label = start + ' - ' + end;
		return (
			<div className="main notice">
				<div className="left">
					<section className="count_section">
						<div className="title">
							今日新增
						</div>
						<Count data={warnCountData.firstWarn} text={"严重警告"} unit={"个"} />
						<Count data={warnCountData.secondWarn} text={"重度警告"} unit={"个"} />
						<Count data={warnCountData.thirdWarn} text={"一般消息"} unit={"个"} />
					</section>
					<section className="count_section">
						<div className="title">
							历史累计
						</div>
						<Count data={warnCountData.firstWarn} text={"严重警告"} unit={"个"} />
						<Count data={warnCountData.secondWarn} text={"重度警告"} unit={"个"} />
						<Count data={warnCountData.thirdWarn} text={"一般消息"} unit={"个"} />

					</section>
					
					<RefreshTime />
				</div>
				<div className="right">
					<div className="whole">
						<div className="daterangepicker-wrapper input-group">
							<DateRangePicker startDate={startDate} endDate={endDate} onEvent={this.handleEvent}>
		                		<div className="daterangepicker-content">
		                			{label}
		                		</div>
		           			</DateRangePicker>
		                </div>
						<NoticeMapChart data={ noticeData } />
					</div>
				</div>
			</div>
		);
	}
	//获取并更新历史数据
    getData() {
		const { location, startDate, endDate } = this.state;
    	let ajaxData = {
    		poicId: location.province,
    		cityId: location.city,
    		cutyDsrcId: location.districtName,
    		startDate: startDate.format('YYYY-MM-DD'),
    		endDate: endDate.format('YYYY-MM-DD'),
    	}
    	this.ajax = $.ajax({
		    url: this.ajaxParam.url,
		    type: 'GET', 
		    data: ajaxData,
		    dataType:'json',
		    success: (res) => {
		        let data = res.dataObject;
		        this.setState({
		        	noticeData: this.convertNoticeData(data.alarmMessageExtendedList || [])
		        })
		        
		    },
		    error: ()=>{
		    },
		    
		})
    }
    convertNoticeData(arr){
    	let data = [];
    	let class1 = [];
    	let class2 = [];
    	let class3 = [];
    	if(arr.length > 0){
			arr.map((item, index)=>{
				if(item.alarmClass == 1){
					class1.push({
						name: item.alarmMsg3,
						value: (() => {
							const coords = item.alarmPos.split("-")
							return [coords[0], coords[1]]
						})(item)
					})
				}
				if(item.alarmClass == 2){
					class2.push({
						name: item.alarmMsg3,
						value: (() => {
							const coords = item.alarmPos.split("-")
							return [coords[0], coords[1]]
						})(item)
					})
				}
				if(item.alarmClass == 3){
					class3.push({
						name: item.alarmMsg3,
						value: (() => {
							const coords = item.alarmPos.split("-")
							return [coords[0], coords[1]]
						})(item)
					})
				}
			})
			data = [class1, class2, class3];
			this.setState({
				warnCountData:{
	        		firstWarn: {number:class1.length, percent:0},
	        		secondWarn: {number:class2.length, percent:0},
	        		thirdWarn: {number:class3.length, percent:0},
	        	},
			})
    	}
    	return data;
    }
}

export default Notice;