import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

let myChart,option;
class RankLineChart extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
	componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('rankLineChart'));
        option = {
            title: {
                text: '全国所有省排名',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: 'white'
                },
                left: 20,
                top: 10
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    },
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: 50,
                left: 60,
                right: 20,
                bottom: 30,
                containLabel: false
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: '#9fa19e'
                    }
                },

                data: this.getXAxisData(this.props.data)
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: '#9fa19e'
                    }
                },
                splitLine: {
                    show:true,
                    lineStyle: {
                        color: '#2f3f6c',
                        width: 1
                    }
                }
            }],
            series:  {
                type: 'line',
                areaStyle: {
                    normal: {
                        lineStyle:{
                            color:'#5397d5'
                        }
                }},
                itemStyle:{
                    normal: {
                        color:'#5397d5',
                        lineStyle:{
                            color:'#2b4268'
                        }
                    }
                },
                data: this.getYAxisData(this.props.data)
            }
        };
        // 绘制图表
        myChart.setOption(option);
        window.addEventListener("resize", this.onWindowResize);

    }
    componentWillReceiveProps(nextProps) {
        option = {
            title: {
                text: nextProps.title,
            },
            xAxis: [{
                data: this.getXAxisData(nextProps.data)
            }],
            series:  {
                data: this.getYAxisData(nextProps.data)
            }
        };
        // 绘制图表
        myChart.setOption(option);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        myChart.dispose();
    }
    onWindowResize(){
        myChart.resize();
    }
    getXAxisData(data){
        let temp = [];
        for (var i = 0; i < data.length; i++) {
            temp.push(data[i].name)
        }
        return temp;
    }
    getYAxisData(data){
        let temp = [];
        for (var i = 0; i < data.length; i++) {
            temp.push(data[i].value)
        }
        return temp;
    }
	render() {
        return (
            <div id="rankLineChart" style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default RankLineChart;