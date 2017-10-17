import React, { Component } from 'react';
import './Login.scss';
import LoginInput from '../../components/loginInput/LoginInput';
import RegisterInput from '../../components/registerInput/RegisterInput';

export class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			hasAccount:true
		};
		this.logNavClick=this.logNavClick.bind(this);
		this.regNavClick=this.regNavClick.bind(this);
	}
	logNavClick(){
		this.setState({
			hasAccount:true
		});
	}
	regNavClick(){
		this.setState({
			hasAccount:false
		});
	}
	render() {
		let hasAccount=this.state.hasAccount;
		return (
			<div className="login-box">
				<h1>智慧畜牧精准扶贫服务平台</h1>
                <form>
                	<h2>
						<span className={hasAccount?"active":""} onClick={this.logNavClick}>登录</span>
						<span className={hasAccount?"":"active"} onClick={this.regNavClick}>注册</span>
                	</h2>
                	{hasAccount?<LoginInput/>:<RegisterInput/>}
                </form>
            </div>
		);
	}
}

export default Login;