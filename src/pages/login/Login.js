import React, { Component } from 'react';
import './Login.scss';
import LoginInput from '../../components/loginInput/LoginInput';
import RegisterInput from '../../components/registerInput/RegisterInput';

export class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			tabIndex:0
		};
	}
	componentDidUpdate(){
		const slidebar=document.getElementsByClassName("slidebar")[0];
		if(this.state.tabIndex==1){
			slidebar.style.left="5.2em";
		}else{
			slidebar.style.left="0";
		}
	}
	changeTabIndex(index,e){
		this.setState({
			tabIndex:index
		});
	}
	render() {
		let tabIndex=this.state.tabIndex;
		return (
			<div className="login-box">
				<h1>智慧畜牧精准扶贫服务平台</h1>
                <form>
                	<div className="tab-nav">
						<div className="nav-slider">
							<a className={tabIndex==0?"active":""} onClick={(e)=>this.changeTabIndex(0,e)}>登录</a>
							<a className={tabIndex==1?"active":""} onClick={(e)=>this.changeTabIndex(1,e)}>注册</a>
							<span className="slidebar"></span>
						</div>
                	</div>
                	{tabIndex==0?<LoginInput/>:<RegisterInput/>}
                </form>
            </div>
		);
	}
}

export default Login;