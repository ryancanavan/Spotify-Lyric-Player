import React, { Component } from 'react';
import Playlist from './Playlist';
import Tracklist from './Tracklist';
import './Frame.css';

class Frame extends Component{
  constructor(props) {
		super(props);
		this.state = {
			username: null,
			playlists: props.playlists,
			playlistSelect: false,
			playlistTracks: [],
			playlistName: null,
			foreignPlaylist: false,
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
		if(!this.state.foreignPlaylist) {
			this.setState({
				playlists: nextProps.playlists
			})
		}
  }
  
  playlistSelect(tracksUrl, playlistName, offset) {
		let params = this.props.params;
		fetch(tracksUrl + '?offset=' + offset, {
			headers: {
				'Authorization': 'Bearer ' + params.access_token,
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			res.json().then((data) => {
				let newTracks = this.state.playlistTracks.concat(data.items);
				this.setState({
					playlistSelect: true,
					playlistTracks: newTracks,
					playlistName: playlistName
				});
				if(data.total > (data.offset + data.limit)) {
					this.playlistSelect(tracksUrl, playlistName, (data.offset + data.limit));
				} else {
					this.props.playlistSelect(this.state.playlistTracks);
				}
			});
		});
  }
  
  getForeignPlaylist(offset) {
		let params = this.props.params;
		fetch('https://api.spotify.com/v1/users/' + this.state.username + '/playlists?offset=' + offset, {
			headers: {
				'Authorization': 'Bearer ' + params.access_token,
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			res.json().then((data) => {
				let newPlaylists = this.state.playlists.concat(data.items);
				this.setState({
					foreignPlaylist: true,
					playlists: newPlaylists
				});
				if(data.total > (data.offset + data.limit)) {
					this.getForeignPlaylist((data.offset + data.limit));
				}
			});
		});
  }
  
  resetPlaylistSelect() {
		this.setState({
			playlistSelect: false,
			playlistTracks: [],
			playlistName: null,
		});
		this.props.playlistReset();
	}

	resetUserPlaylists() {
		this.setState({
			playlists: this.props.playlists,
			foreignPlaylist: false
		});
	}

	disableNewline(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		}
  }
  
  handleChange(event) {
		if (event.keyCode === 13) {
			this.handleSubmit(event);
		} else {
			this.setState({username: event.target.value});
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			playlists: []
		});
		this.getForeignPlaylist(0);
  }
  
  render() {
		return (
			<div className="Frame">
        { this.state.playlistSelect ? (
          <Tracklist data={this.state.playlistTracks} playlistName={this.state.playlistName} onClick={() => this.resetPlaylistSelect()} />
        ) : (
          <div>
            { this.state.foreignPlaylist ? (
              <button className="ResetButton" onClick={() => this.resetUserPlaylists()}><b>Your Playlists</b></button>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <textarea placeholder="Enter a Username" value={this.state.value} onKeyDown={this.disableNewline} onKeyUp={this.handleChange} />
                <input type="submit" value="&#x1F50E;" />
              </form>
            )}
            { (this.state.playlists.length === 0 || this.state.playlists[0] === undefined) ?
              <h3>This user has no public playlists</h3> :
              this.state.playlists.map((playlist, index) =>
                <Playlist key={index} data={playlist} onClick={() => this.playlistSelect(playlist.tracks.href, playlist.name, 0)} />
              )
            }
          </div>
        )}
			</div>
		)
	}
}

export default Frame;
