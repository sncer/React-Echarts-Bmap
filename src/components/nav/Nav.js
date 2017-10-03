import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Nav extends Component {
	render() {
		return (
			<nav>
		    	<ul>
		    		<li><Link to='/app/overview'>Overview</Link></li>
		    		<li><Link to='/app/fence'>Fence</Link></li>
		    		<li><Link to='/app/trace'>Trace</Link></li>
		    		<li><Link to='/app/notice'>Notice</Link></li>
		    	</ul>
		    </nav>
		);
	}
}

export default Nav;