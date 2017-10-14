import React, { Component } from 'react';
import './Login.scss';
import LoginInput from '../../components/loginInput/LoginInput';

export class Login extends Component {
	render() {
		return (
			<div className="login-box">
				<h1>智慧畜牧精准扶贫服务平台</h1>
                <form>
                	<h2>
						<span>登录</span>                		
                	</h2>
                	<LoginInput/>
                </form>
            </div>
		);
	}
}

export default Login;