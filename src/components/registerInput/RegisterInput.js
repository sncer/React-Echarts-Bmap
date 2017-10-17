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
		// this.changeUsername=this.changeUsername.bind(this);
		// this.changePassword=this.changePassword.bind(this);
		// this.changeRepassword=this.changeRepassword.bind(this);
		this.stateChange=this.stateChange.bind(this);
	}

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
	                <input type="password" name="password" value={this.state.password} placeholder="密码"/>
	            </label>
	            <label>
	                <input type="password" name="rePassword" value={this.state.rePassword}  placeholder="再次输入密码"/>
	            </label>
	            <button className="btn btn-primary">注册</button>
            </div>
		);
	}
}

export default RegisterInput;