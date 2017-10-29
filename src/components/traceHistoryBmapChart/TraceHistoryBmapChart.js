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
import BMap from 'BMap';
import $ from 'jquery';

let myChart, option, map;
class TraceHistoryBmapChart extends Component {
	componentDidMount() {
        /*
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
        */
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('traceHistoryBmapChart'));
        option = {
            bmap: {
                // center: [116.46, 39.92],
                // zoom: 10,
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
        // 获取百度地图实例
        map = myChart.getModel().getComponent('bmap').getBMap();
        window.addEventListener("resize", this.onWindowResize);
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data.length > 0){
            myChart.setOption({
                series: [{
                    data: nextProps.data,
                }]
            });
        }
        //根据行政区调整视野
        this.setViewportByLocation(nextProps.location);
            
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
    //根据行政区调整视野
    setViewportByLocation(location){
        let name = "";
        if(location.district !== ""){
            name = location.provinceName + location.cityName + location.districtName;
        }else if(location.city !== ""){
            name = location.provinceName + location.cityName
        }else if(location.province !== ""){
            name = location.provinceName
        }else{
            myChart.setOption({
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 5,
                }
            });
            return
        }
        this.getBoundary(name)
    }
    getBoundary(name){
        if(name !== ""){
            let bdary = new BMap.Boundary();
            bdary.get(name, function(rs){       //获取行政区域
                let count = rs.boundaries.length; //行政区域的点有多少个
                if (count === 0) {
                    console.error('未能获取当前输入行政区域');
                    return ;
                }
                let pointArray = [];
                for (let i = 0; i < count; i++) {
                    let ply = new BMap.Polygon(rs.boundaries[i]); //建立多边形覆盖物
                    pointArray = pointArray.concat(ply.getPath());
                }    
                map.setViewport(pointArray);    //调整视野  
            }); 
        }       
          
    }
}

export default TraceHistoryBmapChart;