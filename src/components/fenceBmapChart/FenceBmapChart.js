import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
// 引入百度地图扩展
import 'echarts/extension/bmap/bmap'
// 引入百度地图自定义样式
import BmapStyleJson from '../../js/utils/bmapStyle.json';
// 引入百度地图全局变量
import BMap from 'BMap';
import $ from 'jquery';
let myChart, option, map;
class FenceMapChart extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.curFence = {
            id: 0,
            code: "",
            name: "",
            value: [],
            coords: [],
            type: "",
            radius: 0,
            location: "",
            class: "",
            provinceName: "",
            cityName: "",
            districtName: "",
        };
    }
	componentDidMount() {

        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('fenceBmapChart'));
        option = {
            backgroundColor: '#404a59',
            title: [
            {},
            {
                id: 'statistic',
                right: 120,
                top: 40,
                width: 100,
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            }
            ],
            tooltip : {
                trigger: 'item'
            },
            grid: {
                right: 20,
                bottom: 20,
                width: 200,
                height: 400,
            },
            xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                boundaryGap: false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 2,
                    textStyle: {
                        color: '#aaa'
                    }
                },
            },
            yAxis: {
                type: 'category',
                name: 'TOP 10',
                nameGap: 16,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#ddd'
                    }
                },
                data: this.getYAxisData(this.props.barData)
            },
            bmap: {
                center: [104.114129, 37.550339],
                zoom: 5,
                roam: true,
                mapStyle: {
                    styleJson: BmapStyleJson
                }
            },
            series : [
                {
                    name: 'overview',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: this.convertData(this.props.data),
                    symbolSize: 10,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                /**
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: this.convertData(this.props.data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: 15,
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                **/
                {
                    id: 'bar',
                    zlevel: 2,
                    type: 'bar',
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    },
                    data: this.props.barData,
                },
                {
                    name: 'detail',
                    type: 'custom',
                    coordinateSystem: 'bmap',
                    renderItem: this.renderItem,
                    itemStyle: {
                        normal: {
                            opacity: 0.5
                        }
                    },
                    animation: false,
                    silent: true,
                    data: [0],
                    z: -10
                }
            ]
        };
        // 绘制图表
        myChart.setOption(option);
        // 获取百度地图实例
        map = myChart.getModel().getComponent('bmap').getBMap();
        // 监听Echarts点击事件
        myChart.on('click', (params) => {
            if(params.data){
                
                this.props.onFenceClick(params.data)
            }
        });
        window.addEventListener("resize", this.onWindowResize);
        
    }
    componentWillReceiveProps(nextProps) {
        //保存当前围栏数据到全局变量中，renderItem中要用到
        this.curFence = nextProps.curFence;

        if(nextProps.curFence.id > 0){
            //设置当前围栏数据
            this.setViewportByFence(nextProps.curFence)
        }else{
            //根据行政区调整视野
            this.setViewportByLocation(nextProps.location);
        }
        
        option = {
            yAxis: {
                type: 'category',
                name: 'TOP 10',
                data: this.getYAxisData(nextProps.barData)
            },
            series : [
                {
                    name: 'overview',
                    data: this.convertData(nextProps.data),
                    
                },
                /**
                {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'bmap',
                    data: this.convertData(this.props.data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: 15,
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                **/
                {
                    id: 'bar',
                    data: nextProps.barData,
                },
                {
                    name: 'detail',
                    type: 'custom',
                    renderItem: this.renderItem,
                    data: [0],
                }
            ]
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
	render() {
        return (
            <div id="fenceBmapChart" style={{ width: '100%', height: '100%' }}></div>
        );
    }
    /**
    *功能：转化data添加value值
    *返回类型：Array
    *value形式：[116.7, 39.53, 123]  => [经度, 维度, 值]
    **/
    convertData(data){
        if(data.length > 0){
            data.map((item,index)=>{
                item.value = this.getCenterCoord(item.type, item.coords)
            });

        }
        return data;
    }
    //设置多边形和圆的绘制属性
    renderItem = (params, api) => {
        //从全局变量获得围栏信息
        let curFence = this.curFence
        let color = api.visual('color');
        let coords = [];
        let points = [];
        if(curFence.type === "polygon"){
            coords = curFence.coords;
            for (let i = 0; i < coords.length; i++) {
                //获取坐标点相对于地图左上角的偏移像素
                points.push(api.coord(coords[i]));
            }
            return {
                type: 'polygon',
                shape: {
                    points: echarts.graphic.clipPointsByRect(points, {
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                    })
                },
                style: api.style({
                    fill: color,
                    stroke: echarts.color.lift(color)
                })
            };
        }
        if(curFence.type === "circle"){
            coords = curFence.coords;
            for (let i = 0; i < coords.length; i++) {
                //获取坐标点相对于地图左上角的偏移像素
                points.push(api.coord(coords[i]));
            }
            //计算半径
            let radius = Math.sqrt(Math.pow(Math.abs(points[0][0]-points[1][0]),2) + Math.pow(Math.abs(points[0][1]-points[1][1]),2));
            return {
                type: 'circle',
                shape: {
                        cx: points[0][0],
                        cy: points[0][1],
                        r: radius,
                    },
                style: api.style({
                    fill: color,
                    stroke: echarts.color.lift(color)
                })
            };
        }
        
    }
    /**
    *功能：根据围栏类型和顶点坐标coords，返回中心点坐标经纬度
    *返回类型：Array
    *形式：[116.7, 39.53]  => [经度, 维度]
    **/
    getCenterCoord(type, coords){
        let center = [];
        if(coords.length > 0){
            if(type === "polygon"){
                let points = [];
                coords.map((item, index)=>{
                    points.push(new BMap.Point(item[0],item[1]))
                });
                let polygon = new BMap.Polygon(points);
                let centerPoint = polygon.getBounds().getCenter();
                center = [centerPoint.lng, centerPoint.lat]
            }
            if(type === "circle"){
                //圆心为第一个点
                center = [coords[0][0],coords[0][1]]
            }
        }
        return center;
    }

    //根据围栏调整视野
    setViewportByFence(fence){
        //从全局变量中获取围栏信息
        let {type, coords} = fence;
        if(coords.length > 0){
            if(type === "polygon"){
                let points = [];
                coords.map((item, index)=>{
                    points.push(new BMap.Point(item[0],item[1]))
                });
                // let polygon = new BMap.Polygon(points);
                map.setViewport(points);    //调整视野 
            }
            if(type === "circle"){
                let points = [];
                //计算半径
                let ra = Math.sqrt(Math.pow(Math.abs(coords[0][0]-coords[1][0]),2) + Math.pow(Math.abs(coords[0][1]-coords[1][1]),2));
                let count = 4;     //四等分
                let radians = (Math.PI / 180) * Math.round(360 / count);   //弧度
                for (let i = 0; i < count; i++) {
                    points.push(new BMap.Point(parseFloat(coords[0][0]) + ra*Math.sin(radians * i), parseFloat(coords[0][1]) + ra*Math.cos(radians * i)))
                }
                map.setViewport(points);    //调整视野
            }
        }
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
    getYAxisData(data){
        let temp = [];
        for (var i = 0; i < data.length; i++) {
            temp.push(data[i].name)
        }
        return temp;
    }

}

export default FenceMapChart;