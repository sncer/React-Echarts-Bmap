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
class TraceTodayBmapChart extends Component {
	componentDidMount() {
        /*
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
        */
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('traceTodayBmapChart'));
        option = {
            bmap: {
                // center: [101.7712184, 36.635464],
                // zoom: 14,
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
        // 获取百度地图实例
        map = myChart.getModel().getComponent('bmap').getBMap();
        window.addEventListener("resize", this.onWindowResize);
        
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.data.length > 0){
            myChart.setOption({
                series: [{
                    data: nextProps.data,
                },{
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
            <div id="traceTodayBmapChart" style={{ width: '100%', height: '100%' }}></div>
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

export default TraceTodayBmapChart;