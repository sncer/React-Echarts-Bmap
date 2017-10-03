import React, { Component } from 'react';

import './Header.scss';
import logoImg from '../../img/logo.png';
import userImg from '../../img/uesrname.png';


export class Header extends Component {
	render() {
		return (
			<header className="app-header">
				<div className="logo">
					<img src={logoImg} alt="中国电信|小牧童" />
				</div>
				<div className="heading">智慧畜牧精准扶贫服务平台</div>
				<div className="bar">

					<i><img src={userImg} alt="" /></i>
					<span>欢迎您</span><em>|</em><span>李美梅</span>
					<button className="logout_btn">退出</button>
				</div>
			</header>
		);
	}
}

export default Header;