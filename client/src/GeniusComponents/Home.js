import React, { Component } from 'react';
import Lyrics from './Lyrics';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      track: null,
    };
  }

  render() {
		return (
			<div className="Home">
        { this.state.track ? (
          <Lyrics />
        ) : (
          <div>
            <h3>Start playing a song on Spotify to view the lyrics here!</h3>
          </div>
        )}
			</div>
		)
	}
}

export default Home;
