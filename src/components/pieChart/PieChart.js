import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class PieChart extends Component {
	componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pieChart'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
            {
                name:'牧场分类',
                type:'pie',
                hoverAnimation: false,
                legendHoverLink:false,
                radius: ['52%', '55%'],
                color: ['#915872', '#3077b7', '#9a8169', '#3f8797'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                   
                },
                tooltip: {
                   show:false,
                   
                },
                
                data:[
                    {value:335, name:''},
                    {value:310, name:''},
                    {value:234, name:''},
                    {value:135, name:''}
                ]
            },
                {
                    name:'牧场分类',
                    type:'pie',
                    radius: ['55%', '70%'],
                    color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9'],
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}\n{d}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:[
                        {value:335, name:'春牧场'},
                        {value:310, name:'夏牧场'},
                        {value:234, name:'秋牧场'},
                        {value:135, name:'冬牧场'}
                    ]
                }
            ]
        };
        // 绘制图表
        myChart.setOption(option);
    }
	render() {
        return (
            <div id="pieChart" style={{ width: '100%', height: '200px' }}></div>
        );
    }
}

export default PieChart;