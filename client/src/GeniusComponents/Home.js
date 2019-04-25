import React, { Component } from 'react';
import Lyrics from './Lyrics';

class Home extends Component {
  getLyrics() {
    let params = this.props.params;
    fetch('https://api.genius.com/search?q=' + this.props.track.track.name + ' ' + this.props.track.track.artists[0].name + '&access_token=' + params.genius_access_token)
    .then((res) => {
      res.json().then((data) => {
        fetch('https://api.genius.com' + data.response.hits[0].result.api_path + '?access_token=' + params.genius_access_token)
        .then((res) => {
          res.json().then((data) => {            
            fetch(data.response.song.url)
            .then((res) => res.text())
            .then((data) => {
              console.log(data);
            });
          });
        });
      });
    });
  }

  render() {
		return (
			<div className="Home">
        { this.props.track ? (
          <Lyrics lyrics={this.getLyrics()} />
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
