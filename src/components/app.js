import React, { Component } from 'react';
import logo from '../assets/images/react-icon.svg'

export default class App extends Component {
    render() {
        return (
            <div>
                <img src={logo}/>
                <div>Welcome to React Boilerplate</div>
            </div>
        )
    }
}