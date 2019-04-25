import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Header from './Header';
import SpotifyBody from './SpotifyComponents/Body';
import GeniusBody from './GeniusComponents/Body';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			params: null,
			selectedTrack: null,
			selectedPlaylist: null,
		};
	}

	componentWillMount() {
		this.setState({
			params: this.getHashParams()
		});
	}

	getHashParams() {
		var hashParams = {};
		if (Cookies.get('slp_sle') !== undefined) hashParams['spotify_error'] = Cookies.get('slp_sle');
		if (Cookies.get('slp_sat') !== undefined) hashParams['spotify_access_token'] = Cookies.get('slp_sat');
		if (Cookies.get('slp_srt') !== undefined) hashParams['spotify_refresh_token'] = Cookies.get('slp_srt');
		if (Cookies.get('slp_gle') !== undefined) hashParams['genius_error'] = Cookies.get('slp_gle');
		if (Cookies.get('slp_gat') !== undefined) hashParams['genius_access_token'] = Cookies.get('slp_gat');
		return hashParams;
	}

	trackSelect(track, playlist) {
		this.setState({
			selectedTrack: track,
			selectedPlaylist: playlist,
		});
	}

	render() {
		return (
			<div className="App">
				<Header />
				<div className="LeftFrame"><SpotifyBody params={this.state.params} trackSelect={(track, playlist) => this.trackSelect(track, playlist)} /></div>
				<div className="RightFrame"><GeniusBody params={this.state.params} track={this.state.selectedTrack} /></div>
				{/* <div className="Player"><Player params={this.state.params} /></div> */}
			</div>
		);
  }
}

export default App;
