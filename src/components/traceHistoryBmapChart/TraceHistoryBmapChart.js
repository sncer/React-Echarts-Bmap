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
// 引入全局变量
import { BmapStyleJson } from '../../js/utils/global';
import $ from 'jquery';

let myChart,option;
class TraceHistoryBmapChart extends Component {
	componentDidMount() {
        $.get(process.env.PUBLIC_URL+'/assets/data/lines-bus.json', function(data) {
            let demoLinesData = [].concat.apply([], data.map(function (busLine, idx) {
                var prevPt;
                var points = [];
                for (var i = 0; i < busLine.length; i += 2) {
                    var pt = [busLine[i], busLine[i + 1]];
                    if (i > 0) {
                        pt = [
                            prevPt[0] + pt[0],
                            prevPt[1] + pt[1]
                        ];
                    }
                    prevPt = pt;

                    points.push([pt[0] / 1e4, pt[1] / 1e4]);
                }
                return {
                    coords: points
                };
            }));
            myChart.setOption({
                series: [{
                    
                    data: demoLinesData,
                    
                }]
            });
        });
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('traceHistoryBmapChart'));
        option = {
            bmap: {
                center: [116.46, 39.92],
                zoom: 10,
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
                silent: true,   //禁用交互
                lineStyle: {
                    normal: {
                        color: '#c23531',
                        opacity: 0.2,
                        width: 1
                    }
                },
                progressiveThreshold: 500,
                progressive: 200
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
            <div id="traceHistoryBmapChart" style={{ width: '100%', height: '100%' }}></div>
        );
    }
}

export default TraceHistoryBmapChart;