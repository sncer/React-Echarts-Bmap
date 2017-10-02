import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Nav extends Component {
	render() {
		return (
			<nav>
		    	<ul>
		    		<li><Link to='/'>Home</Link></li>
		    		<li><Link to='/fence'>Fence</Link></li>
		    		<li><Link to='/trace'>Trace</Link></li>
		    		<li><Link to='/notice'>Notice</Link></li>
		    	</ul>
		    </nav>
		);
	}
}

export default Nav;