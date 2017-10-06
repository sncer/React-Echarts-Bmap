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
class HeatMapChart extends Component {
	componentDidMount() {
        function randomData() {
            return Math.round(Math.random()*1000);
        }
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('heatMapChart'));
        option = {
            title: {
                text: '热力地图',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: 'white'
                },
                left: 20,
                top: 10
            },
            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                type: 'piecewise',
                min: 0,
                max: 1000,
                left: 100,
                bottom: 50,
                itemGap: 0,
                itemWidth: 40,
                itemHeight: 16,
                padding: 0,
                text: ['高','低'],
                splitNumber: 5, 
                inRange: {
                    color: ['#45c8dc','#3ca0b7','#327992','#2b5a74','#25425f'].reverse(),
                    symbol: 'rect',
                },
                textStyle: {
                    color: '#47d1e3',
                },

            },
            series: [
                {
                    name: '全国',
                    type: 'map',
                    mapType: 'china',
                    roam: true,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: false,
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#202b49',
                            borderWidth: 1
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderColor: '#389BB7',
                            borderWidth: 0
                        }
                    },
                    data:[
                        {name: '北京',value: randomData() },
                        {name: '天津',value: randomData() },
                        {name: '上海',value: randomData() },
                        {name: '重庆',value: randomData() },
                        {name: '河北',value: randomData() },
                        {name: '河南',value: randomData() },
                        {name: '云南',value: randomData() },
                        {name: '辽宁',value: randomData() },
                        {name: '黑龙江',value: randomData() },
                        {name: '湖南',value: randomData() },
                        {name: '安徽',value: randomData() },
                        {name: '山东',value: randomData() },
                        {name: '新疆',value: randomData() },
                        {name: '江苏',value: randomData() },
                        {name: '浙江',value: randomData() },
                        {name: '江西',value: randomData() },
                        {name: '湖北',value: randomData() },
                        {name: '广西',value: randomData() },
                        {name: '甘肃',value: randomData() },
                        {name: '山西',value: randomData() },
                        {name: '内蒙古',value: randomData() },
                        {name: '陕西',value: randomData() },
                        {name: '吉林',value: randomData() },
                        {name: '福建',value: randomData() },
                        {name: '贵州',value: randomData() },
                        {name: '广东',value: randomData() },
                        {name: '青海',value: randomData() },
                        {name: '西藏',value: randomData() },
                        {name: '四川',value: randomData() },
                        {name: '宁夏',value: randomData() },
                        {name: '海南',value: randomData() },
                        {name: '台湾',value: randomData() },
                        {name: '香港',value: randomData() },
                        {name: '澳门',value: randomData() }
                    ]
                }
            ]
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
            <div id="heatMapChart" style={{ width: '100%', height: '500px' }}></div>
        );
    }
}

export default HeatMapChart;