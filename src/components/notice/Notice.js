import React, { Component } from 'react';
import RefreshTime from '../../components/refreshTime/RefreshTime';
import Count from '../../components/count/Count';
import NoticeMapChart from '../../components/noticeMapChart/NoticeMapChart';
import './Notice.scss';
export class Notice extends Component {
	constructor(){
        super();
        this.state = {
        	warnCountData:{
        		firstWarn: {number:5620,percent:5.6},
        		secondWarn: {number:56840,percent:-1.6},
        		thirdWarn: {number:586200,percent:-0.6},
        	}
        }
    }
	render() {
		return (
			<div className="main notice">
				<div className="left">
					<section className="count_section">
						<div className="title">
							今日新增
						</div>
						<Count data={this.state.warnCountData.firstWarn} text={"严重警告"} unit={"个"} />
						<Count data={this.state.warnCountData.secondWarn} text={"重度警告"} unit={"个"} />
						<Count data={this.state.warnCountData.thirdWarn} text={"一般消息"} unit={"个"} />
					</section>
					<section className="count_section">
						<div className="title">
							历史累计
						</div>
						<Count data={this.state.warnCountData.firstWarn} text={"严重警告"} unit={"个"} />
						<Count data={this.state.warnCountData.secondWarn} text={"重度警告"} unit={"个"} />
						<Count data={this.state.warnCountData.thirdWarn} text={"一般消息"} unit={"个"} />

					</section>
					
					<RefreshTime />
				</div>
				<div className="right">
					<div className="whole">
						<NoticeMapChart />
					</div>
				</div>
			</div>
		);
	}
}

export default Notice;