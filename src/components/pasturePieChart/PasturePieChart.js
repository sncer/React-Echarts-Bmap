import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class PasturePieChart extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
	componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pasturePieChart'));
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
                data: this.getInnerData(this.props.data)
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
                    data: this.props.data
                }
            ]
        };
        // 绘制图表
        myChart.setOption(option);
    }
    getInnerData(data){
        let temp = [];
        for (var i = 0; i < data.length; i++) {
            temp.push({
                name: '',
                value: data[i].value
            })
        }
        console.log(temp)
        return temp;
    }
	render() {
        return (
            <div id="pasturePieChart" style={{ width: '100%', height: '200px' }}></div>
        );
    }
}

export default PasturePieChart;