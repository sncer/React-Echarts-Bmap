import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';
class Nav extends Component {
	render() {
		return (
			<nav className="app-nav">
		    	<ul>
		    		<li><NavLink to='/app/overview'>牧场概览</NavLink></li>
		    		<li><NavLink to='/app/fence'>电子围栏</NavLink></li>
		    		<li><NavLink to='/app/trace'>轨迹回放</NavLink></li>
		    		<li><NavLink to='/app/notice'>消息中心</NavLink></li>
		    	</ul>
		    </nav>
		);
	}
}

export default Nav;