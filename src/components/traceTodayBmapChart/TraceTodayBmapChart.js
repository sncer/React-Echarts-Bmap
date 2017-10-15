import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
// 引入百度地图扩展
import 'echarts/extension/bmap/bmap';
// 引入百度地图自定义样式
import BmapStyleJson from '../../js/utils/bmapStyle.json';
import $ from 'jquery';

let myChart,option;
class TraceTodayBmapChart extends Component {
	componentDidMount() {
        $.get(process.env.PUBLIC_URL+'/assets/data/hangzhou-tracks.json', function(data) {
            let demoLinesData = data.map(function (track) {
                return {
                    coords: track.map(function (seg, idx) {
                        return seg.coord;
                    })
                };
            });
            myChart.setOption({
                series: [{
                    data: demoLinesData,
                },{
                    data: demoLinesData,
                }]
            });
        });
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('traceTodayBmapChart'));
        option = {
            bmap: {
                center: [120.13066322374, 30.240018034923],
                zoom: 14,
                roam: true,
                mapStyle: {
                    styleJson: BmapStyleJson
                }
            },
            series: [{
                type: 'lines',
                coordinateSystem: 'bmap',
                data: [],
                polyline: true,
                lineStyle: {
                    normal: {
                        color: '#f4e925',
                        opacity: 0.6,
                        width: 1
                    }
                }
            }, 
            {
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: [],
                lineStyle: {
                    normal: {
                        color: '#fff',
                        width: 0
                    }
                },
                effect: {
                    constantSpeed: 20,
                    show: true,
                    trailLength: 0.1,
                    symbolSize: 1.5
                },
                zlevel: 1
            }]
        };
        // 绘制图表
        myChart.setOption(option);

        window.addEventListener("resize", this.onWindowResize);
        
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
            <div id="traceTodayBmapChart" style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default TraceTodayBmapChart;