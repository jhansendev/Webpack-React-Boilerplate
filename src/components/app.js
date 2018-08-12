import React, { Component } from 'react';
import logo from '../assets/images/react-icon.svg';
import './app.scss';


export default class App extends Component {
	render() {
		return (
			<div className="container">
				<img src={logo} />
				<div>
                Welcome to React Boilerplate
				</div>
			</div>
		);
	}
}
