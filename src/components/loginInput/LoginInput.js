import React,{Component} from "react";
import './LoginInput.scss';

export class LoginInput extends Component{
	constructor(props){
		super(props);
		this.state={
			username:"",
			password:"",
		};
		this.handleChange=this.handleChange.bind(this);
	}

	// 监听input中的数据，保存到State中
	handleChange(e){
		const target=e.target;
		this.setState({
			[target.name]:target.value
		});
	}

	render(){
		return (
			<div className="loginInput">
                <label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="用户名"/>
	            </label>
	            <label>
	                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="密码"/>
	            </label>
	            <button className="btn btn-primary">登录</button>
            </div>
		);
	}
}

export default LoginInput;