import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';
class Nav extends Component {
	render() {
		return (
			<nav className="app-nav">
		    	<ul>
		    		<li><Link to='/app/overview'>牧场概览</Link></li>
		    		<li><Link to='/app/fence'>电子围栏</Link></li>
		    		<li><Link to='/app/trace'>轨迹回放</Link></li>
		    		<li><Link to='/app/notice'>消息中心</Link></li>
		    	</ul>
		    </nav>
		);
	}
}

export default Nav;