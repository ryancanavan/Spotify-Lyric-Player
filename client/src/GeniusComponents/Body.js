import React, { Component } from 'react';
import Login from './Login';
import Home from './Home';

class Body extends Component {
	render() {
		return (
			<div className="Body">
				{ this.props.params.genius_access_token ? (
					<Home params={this.props.params} track={this.props.track} />					
				) : (
					<Login error={this.props.params.genius_error} />
				)}
			</div>
		);
	}
}

export default Body;
