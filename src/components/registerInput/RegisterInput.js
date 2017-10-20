import React,{Component} from "react";
import '../loginInput/LoginInput.scss';

export class RegisterInput extends Component{
	constructor(props){
		super(props);
		this.state={
			username:"",
			password:"",
			rePassword:""
		};
		this.handleChange=this.handleChange.bind(this);
	}

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
	            <label>
	                <input type="password" name="rePassword" value={this.state.rePassword} onChange={this.handleChange} placeholder="再次输入密码"/>
	            </label>
	            <button className="btn btn-primary">注册</button>
            </div>
		);
	}
}

export default RegisterInput;