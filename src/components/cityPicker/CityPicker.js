import React, {Component} from 'react'

const Select = ({ name, value, handleChange, options }) => {
  return (
    <select name={name} value={value} onChange={handleChange}>
      <option value="">请选择</option>
      {options.map(item => <Option key={item.code} option={item} />)}
    </select>
  )
}

const Option = ({ option }) => {
  return <option value={option.code}>{option.value}</option>
}

class CityPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      province: '',
      provinceName: '',
      city: '',
      cityName: '',
      district: '',
      districtName: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProvince, selectedCity, selectedDistrict } = nextProps
    this.setState({
      province: selectedProvince,
      city: selectedCity,
      district: selectedDistrict,
    })
  }
  
  componentDidMount() {
    const { value } = this.props
    const { selectedProvince, selectedCity, selectedDistrict } = this.props
    this.setState({
      province: selectedProvince,
      city: selectedCity,
      district: selectedDistrict,
    })
  }
  
  handleOptionChange = (e) => {
    let selectedName = e.target.options[e.target.selectedIndex].text;
    const { onOptionChange } = this.props
    this.setState({
      [e.target.name]: e.target.value,
    })
    if(e.target.name === 'province') {
      this.setState({
        city: '',
        district: '',
        provinceName: selectedName,
        cityName: '',
        districtName: '',
      })
    }
    if(e.target.name === 'city') {
      this.setState({
        district: '',
        cityName: selectedName,
        districtName: '',
      })
    }
    if(e.target.name === 'district'){
      this.setState({
        districtName: selectedName,
      })
    }
    setTimeout(()=>onOptionChange && onOptionChange(this.state), 0)
  }
  
  render() {
    const { source, onOptionChange, selectedProvince, selectedCity, selectedDistrict, noDistrict, ...props } = this.props
    const { province, city, district } = this.state
    const provinces = Object.keys(source['86']).map(item => ({code: item, value: source['86'][item]}))
    const cities = province ? Object.keys(source[province] || {}).map(item => ({code: item, value: source[province][item]})) : []
    const districts = city ? Object.keys(source[city] || {}).map(item => ({code: item, value: source[city][item]})) : []
    return (
      <div {...props}>
        <Select name="province" value={province} handleChange={this.handleOptionChange} options={provinces} />
        <Select name="city" value={city} handleChange={this.handleOptionChange} options={cities} />
        {!noDistrict &&
          <Select name="district" value={district} handleChange={this.handleOptionChange} options={districts} />
        }
      </div>
    )
  }
}

export default CityPicker;