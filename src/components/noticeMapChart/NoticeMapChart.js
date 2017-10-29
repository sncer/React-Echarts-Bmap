import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
// 引入中国地图（默认显示）
import 'echarts/map/js/china'

let myChart,option;
class NoticeMapChart extends Component {
	componentDidMount() {

        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('noticeMapChart'));
        option = {
            backgroundColor: '#404a59',
            color: ['#d74e67', '#f4e925', '#ffa022', '#46bee9', '#a6c84c'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 50,
                bottom: 50,
                data: ['严重警告','重度警告','一般消息'],
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series : [
                {
                    name: '严重警告',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: 16,
                    // showEffectOn: 'render',
                    // rippleEffect: {
                    //     brushType: 'stroke'
                    // },
                    // hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'top',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    // itemStyle: {
                    //     normal: {
                    //         shadowBlur: 10,
                    //         shadowColor: '#333'
                    //     }
                    // },
                    zlevel: 4
                },
                {
                    name: '重度警告',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: 14,
                    // showEffectOn: 'render',
                    // rippleEffect: {
                    //     brushType: 'stroke'
                    // },
                    // hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'top',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    // itemStyle: {
                    //     normal: {
                    //         shadowBlur: 10,
                    //         shadowColor: '#333'
                    //     }
                    // },
                    zlevel: 3
                },
                {
                    name: '一般消息',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: 10,
                    // showEffectOn: 'render',
                    // rippleEffect: {
                    //     brushType: 'stroke'
                    // },
                    // hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'top',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    // itemStyle: {
                    //     normal: {
                    //         shadowBlur: 10,
                    //         shadowColor: '#333'
                    //     }
                    // },
                    zlevel: 2
                },
                // {
                //     name: '高温警告',
                //     type: 'scatter',
                //     coordinateSystem: 'geo',
                //     data: [],
                //     symbolSize: 10,
                //     label: {
                //         normal: {
                //             formatter: '{b}',
                //             position: 'top',
                //             show: false
                //         },
                //         emphasis: {
                //             show: true
                //         }
                //     },
                //     zlevel: 1
                // },
            ]
        };
        // 绘制图表
        myChart.setOption(option);

        window.addEventListener("resize", this.onWindowResize);
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data.length > 0){
            myChart.setOption({
                series: [{
                    name: '严重警告',
                    data: nextProps.data[0],
                },{
                    name: '重度警告',
                    data: nextProps.data[1],
                },{
                    name: '一般消息',
                    data: nextProps.data[2],
                }]
            });
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        myChart.dispose();
    }
    onWindowResize(){
        myChart.resize();
    }
	render() {
        return (
            <div id="noticeMapChart" style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default NoticeMapChart;