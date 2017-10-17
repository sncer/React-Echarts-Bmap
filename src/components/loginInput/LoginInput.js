import React,{Component} from "react";
import './LoginInput.scss';

export class LoginInput extends Component{
	constructor(props){
		super(props);
		this.state={
			username:"",
			password:"",
		};
		this.stateChange=this.stateChange.bind(this);
	}

	// 监听input中的数据，保存到State中
	stateChange(e){
		let target=e.target;
		this.setState({
			[target.name]:target.value
		});
	}

	render(){
		return (
			<div className="loginInput" onChange={this.stateChange}>
                <label>
                    <input type="text" name="username" value={this.state.username} placeholder="用户名"/>
	            </label>
	            <label>
	                <input type="password" name="password" value={this.state.password}  placeholder="密码"/>
	            </label>
	            <button className="btn btn-primary">登录</button>
            </div>
		);
	}
}

export default LoginInput;