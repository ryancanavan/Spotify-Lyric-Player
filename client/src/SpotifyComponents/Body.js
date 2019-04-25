import React, { Component } from 'react';
import Login from './Login';
import Home from './Home';

class Body extends Component {
  render() {
		return (
			<div className="Body">
				{ this.props.params.spotify_access_token ? (
					<Home params={this.props.params} trackSelect={(track, playlist) => this.props.trackSelect(track, playlist)} />					
				) : (
					<Login error={this.props.params.spotify_error} />
				)}
			</div>
		);
	}
}

export default Body;
