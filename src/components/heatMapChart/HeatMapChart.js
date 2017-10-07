import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
// 引入中国地图（默认显示）
import 'echarts/map/js/china';
// 引入全国344个市、区、州对应的数字编号
import { CityMap, ProvinceMap, SpecialRegion } from '../../js/utils/global';
// 引入jQuery（重要）
import $ from 'jquery';

let myChart;
//初始化绘制全国地图配置
let option = {
    title: {
        text: '热力地图',
        subtext: '全国',
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
        animationDuration:1000,
        animationEasing:'cubicOut',
        animationDurationUpdate:1000
    },
    
};
class HeatMapChart extends Component {
	componentDidMount() {
        //用于存储全国的数据
        var mapjson = [];
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('heatMapChart'));

        //绘制全国地图
        $.getJSON( process.env.PUBLIC_URL + '/assets/map/china.json', function(json){
            //生成Demo数据
            var data = [];
            for( var i = 0; i < json.features.length; i++ ){
                data.push({
                    name: json.features[i].properties.name,
                    value: getRandomData()
                })
            }
            mapjson = data;
            //注册地图
            echarts.registerMap('china', json);
            //绘制地图
            renderMap('china', data);
        });

        //地图点击事件
        myChart.on('click', function (params) {
            console.log( params );
            if( params.name in ProvinceMap ){
                //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
                $.getJSON( process.env.PUBLIC_URL + '/assets/map/province/' + ProvinceMap[params.name] +'.json', function(json){
                    echarts.registerMap( params.name, json);
                    var data = [];
                    for( var i = 0; i < json.features.length; i++ ){
                        data.push({
                            name: json.features[i].properties.name,
                            value: getRandomData()
                        })
                    }
                    renderMap(params.name, data);
                });
            }else if( params.seriesName in ProvinceMap ){
                //如果是 直辖市/特别行政区 只有二级下钻
                if( SpecialRegion.indexOf( params.seriesName ) >= 0 ){
                    renderMap('china',mapjson);
                }else{
                    //显示县级地图
                    $.getJSON( process.env.PUBLIC_URL + '/assets/map/city/'+ CityMap[params.name] +'.json', function(json){
                        echarts.registerMap( params.name, json);
                        var data = [];
                        for( var i=0;i<json.features.length;i++ ){
                            data.push({
                                name: json.features[i].properties.name,
                                value: getRandomData()
                            })
                        }
                        renderMap(params.name, data);
                    }); 
                }   
            }else{
                renderMap('china', mapjson);
            }
        });
        function getRandomData() {
            return Math.round(Math.random()*1000);
        }
        function renderMap(map, data){
            option.title.subtext = map =='china'?'全国':map;
            option.series = [ 
                {
                    name: map =='china'?'全国':map,
                    type: 'map',
                    mapType: map,
                    roam: false,
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
                    data: data,
                }   
            ];
            //渲染地图
            myChart.setOption(option);
        }

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
            <div id="heatMapChart" style={{ width: '100%', height: '500px' }}></div>
        );
    }
}

export default HeatMapChart;