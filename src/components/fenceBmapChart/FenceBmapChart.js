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
                data: ["沈阳","太原","天津","南宁","石家庄","上海","哈尔滨","武汉","北京","南昌","济南","西安","吉林","南京","成都"]
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
                    data: [{
                        name: "北京",
                        value: 38
                    }, {
                        name: "南京",
                        value: 147
                    }, {
                        name: "吉林",
                        value: 74
                    }, {
                        name: "上海",
                        value: 33
                    }, {
                        name: "成都",
                        value: 192
                    }, {
                        name: "哈尔滨",
                        value: 35
                    }, {
                        name: "沈阳",
                        value: 0
                    }, {
                        name: "武汉",
                        value: 36
                    }, {
                        name: "石家庄",
                        value: 32
                    }, {
                        name: "天津",
                        value: 7
                    }, {
                        name: "太原",
                        value: 1
                    }, {
                        name: "西安",
                        value: 63
                    }, {
                        name: "南宁",
                        value: 29
                    }, {
                        name: "南昌",
                        value: 48
                    }, {
                        name: "济南",
                        value: 61
                    }],
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
                this.curFence = params.data;
                myChart.setOption({
                    name: 'detail',
                    type: 'custom',
                    renderItem: this.renderItem,
                    data: [0],
                });
                this.setViewportByFence()
            }
        });
        window.addEventListener("resize", this.onWindowResize);
        
    }
    componentWillReceiveProps(nextProps) {
        option = {
            yAxis: {
                type: 'category',
                name: 'TOP 10',
                data: ["沈阳","太原","天津","南宁","石家庄","上海","哈尔滨","武汉","北京","南昌","济南","西安","吉林","南京","成都"]
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
                    data: [{
                        name: "北京",
                        value: 38
                    }, {
                        name: "南京",
                        value: 147
                    }, {
                        name: "吉林",
                        value: 74
                    }, {
                        name: "上海",
                        value: 33
                    }, {
                        name: "成都",
                        value: 192
                    }, {
                        name: "哈尔滨",
                        value: 35
                    }, {
                        name: "沈阳",
                        value: 0
                    }, {
                        name: "武汉",
                        value: 36
                    }, {
                        name: "石家庄",
                        value: 32
                    }, {
                        name: "天津",
                        value: 7
                    }, {
                        name: "太原",
                        value: 1
                    }, {
                        name: "西安",
                        value: 63
                    }, {
                        name: "南宁",
                        value: 29
                    }, {
                        name: "南昌",
                        value: 48
                    }, {
                        name: "济南",
                        value: 61
                    }],
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

    //调整视野
    setViewportByFence(){
        let {type, coords, radius} = this.curFence;
        if(coords.length > 0){
            if(type === "polygon"){
                let points = [];
                coords.map((item, index)=>{
                    points.push(new BMap.Point(item[0],item[1]))
                });
                let polygon = new BMap.Polygon(points);
                map.setViewport(polygon.getPath());    //调整视野 
            }
            if(type === "circle"){
                let point = new BMap.Point(coords[0][0],coords[0][1])
                let circle =  new BMap.Circle(point,radius);
                map.setViewport({
                    center: point,
                    zoom: 14
                });    //调整视野
            }
        }
    }

}

export default FenceMapChart;