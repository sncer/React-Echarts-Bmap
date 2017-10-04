import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

let myChart,option;
class RankLineChart extends Component {
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
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: ['牲畜', '牧户', '牧场'],
                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                top: 50,
                left: 50,
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

                data: ['河北','天津','北京','辽宁','山东','青海','西藏','宁夏','湖南','山西','重庆']
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
                    textStyle: {
                        fontSize: 12,
                        color: '#9fa19e'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#2f3f6c'
                    }
                }
            }],
            series: [{
                name: '牲畜',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(137,189,27)',
                        borderColor: 'rgba(137,189,2,0.27)',
                        borderWidth: 12

                    }
                },
                data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
            }, {
                name: '牧户',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(0,136,212)',
                        borderColor: 'rgba(0,136,212,0.2)',
                        borderWidth: 12

                    }
                },
                data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
            }, {
                name: '牧场',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(219, 50, 51, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(219, 50, 51, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {

                        color: 'rgb(219,50,51)',
                        borderColor: 'rgba(219,50,51,0.2)',
                        borderWidth: 12
                    }
                },
                data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
            }, ]
        };
        // 绘制图表
        myChart.setOption(option);
        window.addEventListener("resize", this.onWindowResize);

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }
    onWindowResize(){
        myChart.resize();
    }
	render() {
        return (
            <div id="rankLineChart" style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default RankLineChart;