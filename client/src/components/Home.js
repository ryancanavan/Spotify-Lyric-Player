import React, { Component } from 'react';
import Frame from './Frame';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      playlists: [],
      tracks: [],
    };
  }

  componentWillMount(){
    this.getPlaylists(0);
  }

  getPlaylists(offset){
    let params = this.props.params;
    fetch('https://api.spotify.com/v1/me/playlists?offset=' + offset, {
      headers: {
        'Authorization': 'Bearer ' + params.access_token,
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      res.json().then((data) => {
        let newPlaylists = this.state.playlists.concat(data.items);
        this.setState({
          playlists: newPlaylists
        });
        if(data.total > (data.offset + data.limit)) {
          this.getPlaylists((data.offset + data.limit));
        }
      });
    });
  }

  PlaylistSelect = (playlistTracks) => {
    this.setState({
      tracks: playlistTracks,
    });
  }

  PlaylistReset = () => {
    this.setState({
      tracks: [],
    });
  }

  render() {
		return (
			<div className="Home">
        <Frame playlists={this.state.playlists} params={this.props.params} playlistSelect={this.PlaylistSelect} playlistReset={this.PlaylistReset} />
			</div>
		)
	}
}

export default Home;
