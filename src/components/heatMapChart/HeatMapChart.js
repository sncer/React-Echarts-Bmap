import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
// 引入全国344个市、区、州对应的数字编号, 和相关通用方法
import { CityMap, ProvinceMap, SpecialRegion, ProvinceNameMap, ProvinceCodeMap, getFullNameByName, getCodeByName } from '../../js/utils/geoMap';
import AreaData from '../../js/utils/areaData.json';
// 引入jQuery（重要）
import $ from 'jquery';

let myChart;
//初始化绘制全国地图配置
let option = {
    title: {
        text: '热力地图',
        // subtext: '全国',
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
        max: 2100,
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
    constructor(){
        super();
        this.state = {
        };
        this.chinaData = [];
        this.newLocation = {
            province: '',
            provinceName: '',
            city: '',
            cityName: '',
            district: '',
            districtName: '',
        }
    }
    componentWillReceiveProps(nextProps) {

        //接收新参数，更新图表数据
        let {location, data} = nextProps
        let name = "";
        this.newLocation = location;
        if(location.district != ''){
            name = location.districtName;
        }else if(location.city != ''){
            name = location.cityName;
            this.renderCityMap(name, data);
        }else if(location.province != ''){
            name = ProvinceNameMap[location.provinceName];
            this.renderProvinceMap(name, data);
        }else{
            name = "china";
            data = this.convertProvinceName(data);
            this.chinaData = data;
            this.renderMap(name, data)
        }
        
    }
	componentDidMount() {
        
        // 基于准备好的dom，初始化echarts实例
        myChart = echarts.init(document.getElementById('heatMapChart'));

        //绘制全国地图
        $.getJSON( process.env.PUBLIC_URL + '/assets/map/china.json', (json) =>{
            //数据暂时为空，当props中data修改后，再更新地图数据
            var data = [];
            /**
                //生成Demo数据（暂无用）
                for( var i = 0; i < json.features.length; i++ ){
                    data.push({
                        name: json.features[i].properties.name,
                        value: this.getRandomData()
                    })
                }
                this.chinaData = data;
            **/
            
            //注册地图
            echarts.registerMap('china', json);
            //绘制地图
            this.renderMap('china', data);
        });

        //地图点击事件
        myChart.on('click', (params) => {
            if( params.name in ProvinceMap ){
                //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
                this.renderProvinceMap(params.name, []);
                //更新地址,增加省
                this.props.onClickHandler($.extend(this.newLocation,{
                    province: getCodeByName(params.name),
                    provinceName: getFullNameByName(params.name),
                }))
            }else if( params.seriesName in ProvinceMap ){
                //如果是直辖市/特别行政区，只有二级下钻
                if( SpecialRegion.indexOf(params.seriesName) >= 0 ){
                    
                    // this.props.onClickHandler($.extend(this.newLocation,{
                    //     city: CityMap[getFullNameByName(params.seriesName)],
                    //     cityName: getFullNameByName(params.seriesName),
                    //     district: '',
                    //     districtName: '',
                    // }))
                    if(params.name){

                        //更新地址,增加市和县
                        let cityName = getFullNameByName(params.seriesName);
                        let city = CityMap[cityName];
                        let districtName = params.name;
                        let district = this.getDistrictCodeByName(city, districtName);
                        if(district){
                            //更新地址,增加县
                            this.props.onClickHandler($.extend(this.newLocation,{
                                city: city,
                                cityName: cityName,
                                district: district,
                                districtName: districtName,
                            }))
                        }
                    }

                    /*回到全国
                    this.renderMap('china',this.chinaData);
                    //更新地址回到默认状态
                    this.props.onClickHandler($.extend(this.newLocation,{
                        province: '',
                        provinceName: '',
                        city: '',
                        cityName: '',
                        district: '',
                        districtName: '',
                    }))
                    */
                }else{
                    this.renderCityMap(params.name, []);
                    //更新地址,增加市
                    this.props.onClickHandler($.extend(this.newLocation,{
                        city: CityMap[params.name],
                        cityName: params.name,
                        district: '',
                        districtName: '',
                    }))
                }   
            }else{
                if(params.name){
                    let districtName = params.name;
                    let district = this.getDistrictCodeByName(this.props.location.city, districtName);
                    if(district){
                        //更新地址,增加县
                        this.props.onClickHandler($.extend(this.newLocation,{
                            district: district,
                            districtName: districtName,
                        }))
                    }
                }
                    
                /*
                // 点击县级单位，回到全国
                this.renderMap('china', this.chinaData);
                //更新地址回到默认状态
                this.props.onClickHandler($.extend(this.newLocation,{
                    province: '',
                    provinceName: '',
                    city: '',
                    cityName: '',
                    district: '',
                    districtName: '',
                }))
                */
            }
        });

        window.addEventListener("resize", this.onWindowResize);
        
    }
    
    //绘制二级地图（各省）
    //name: 省份简称，data：该省各市数据
    renderProvinceMap(name, data){
        $.getJSON( process.env.PUBLIC_URL + '/assets/map/province/' + ProvinceMap[name] +'.json', (json) => {
            
            echarts.registerMap(name, json);
            /**
                var data = [];
                //生成Demo数据（暂无用）
                for( var i = 0; i < json.features.length; i++ ){
                    data.push({
                        name: json.features[i].properties.name,
                        value: this.getRandomData()
                    })
                }
            **/
            this.renderMap(name, data);
            
        });
    }
    //绘制三级地图（各市）
    //name: 市名称，data：该市各县数据
    renderCityMap(name, data){
        $.getJSON( process.env.PUBLIC_URL + '/assets/map/city/'+ CityMap[name] +'.json', (json) => {
            echarts.registerMap( name, json);
            /**
                var data = [];
                for( var i=0;i<json.features.length;i++ ){
                    data.push({
                        name: json.features[i].properties.name,
                        value: this.getRandomData()
                    })
                }
            **/
            this.renderMap(name, data);
        }); 
    }
    //更新地图
    renderMap(map, data) {
        // option.title.subtext = map =='china'?'全国':map;
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
                visualMap: {
                    min: this.getMinValue(data),
                    max: this.getMaxValue(data),
                },
            }   
        ];
        //渲染地图
        myChart.setOption(option);
    }
    // 将省的名字由全称转为简称
    convertProvinceName(data){
        let temp = [];
        if(data.length > 0){
            for (var i = 0; i < data.length; i++) {
                temp.push({
                    name: ProvinceNameMap[data[i].name],
                    value: data[i].value,
                    fullName: data[i].name,
                    code: ProvinceCodeMap[data[i].name]
                }); 
            }
        }
        return temp;
    }
    //获取最大值
    getMaxValue(data){
        let max = 0;
        if(data.length > 0){
            for (var i = 0; i < data.length; i++) {
                if(data[i].value > max){
                    max = data[i].value
                }
                
            }
        }
        return max;
    }
    //获取最小值
    getMinValue(data){
        let min = 0;
        if(data.length > 0){
            for (var i = 0; i < data.length; i++) {
                if(data[i].value < min){
                    min = data[i].value
                }
                
            }
        }
        return min;
    }

	render() {
        return (
            <div id="heatMapChart" style={{ width: '100%', height: '500px' }}></div>
        );
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
        myChart.dispose();
    }
    onWindowResize(){
        myChart.resize();
    }
    //生成随机数
    getRandomData() {
        return Math.round(Math.random()*1000);
    }
    //根据县名字获取编码
    getDistrictCodeByName(city, districtName){
        let district = "";
        const districts = AreaData[city];
        if(districts){
            for(let key in districts){
                if(districts[key] == districtName){
                    return key
                }
            }
        }
        return district;

    }
}

export default HeatMapChart;