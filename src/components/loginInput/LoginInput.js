import React,{Component} from "react";
import './LoginInput.scss';

export class LoginInput extends Component{
	constructor(props){
		super(props);
		this.state={
			userName:"",
			userPassword:"",
		};
	}

	// 监听input中的数据，保存到State中
	changeUsername(e){
		let uname=e.target.value;
		this.setState({
			userName:uname
		});
		console.log(this.state.userName);
	}

	changePassword(e){
		let upwd=e.target.value;
		this.setState({
			userPassword:upwd
		});
	}

	render(){
		return (
			<div className="loginInput">
                <label>
                    <input type="text" name="username" placeholder="用户名"/>
	            </label>
	            <label>
	                <input type="text" name="password" placeholder="密码"/>
	            </label>
	            <button className="btn btn-primary">登录</button>
            </div>
		);
	}
}

export default LoginInput;