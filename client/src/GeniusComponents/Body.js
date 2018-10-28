import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Login from './Login';
import Home from './Home';

class Body extends Component {
  constructor() {
		super();
		this.state = {
			params: null,
		};
	}

	componentWillMount() {
		let params = this.getHashParams();
		this.setState({
			params: params
		});
	}

	getHashParams() {
		var hashParams = {};
		if (Cookies.get('slp_gle') !== undefined) hashParams['error'] = Cookies.get('slp_gle');
		if (Cookies.get('slp_gat') !== undefined) hashParams['access_token'] = Cookies.get('slp_gat');
		return hashParams;
	}
  
  render() {
		return (
			<div className="Body">
				{ this.state.params.access_token ? (
					<Home params={this.state.params} />					
				) : (
					<Login error={this.state.params.error} />
				)}
			</div>
		);
	}
}

export default Body;
