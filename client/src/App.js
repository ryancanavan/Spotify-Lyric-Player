import React, { Component } from 'react';
import Header from './Header';
import SpotifyBody from './SpotifyComponents/Body';
import GeniusBody from './GeniusComponents/Body';
import './App.css';

class App extends Component {
  	render() {
		return (
			<div className="App">
				<Header />
				<div className="LeftFrame"><SpotifyBody /></div>
				<div className="RightFrame"><GeniusBody /></div>
			</div>
		);
  }
}

export default App;
