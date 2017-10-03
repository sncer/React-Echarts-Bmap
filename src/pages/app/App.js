import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import Footer from '../../components/footer/Footer';
import Overview from '../../components/overview/Overview';
import Fence from '../../components/fence/Fence';
import Trace from '../../components/trace/Trace';
import Notice from '../../components/notice/Notice';
import './App.scss'

class App extends Component {
	render() {
		return (
			<div className="app-warpper">
				<Header />
				<Nav />
				<Switch>
					<Route exact path='/' component={Overview}/>
					<Route exact path='/app/' component={Overview}/>
			    	<Route path='/app/overview' component={Overview}/>
			    	<Route path='/app/fence' component={Fence}/>
			    	<Route path='/app/trace' component={Trace}/>
			    	<Route path='/app/notice' component={Notice}/>
			    </Switch>
			    <Footer />
			</div>
		);
	}
}

export default App;