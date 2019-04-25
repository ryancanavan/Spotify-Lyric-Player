import React, { Component } from 'react';
import Track from './Track';
import './Tracklist.css';

class TrackList extends Component {
	constructor(props){
		super(props);
		this.state = {
			sort: "oldest",
			filter: false,
			playlist: props.data,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			playlist: nextProps.data
		})
	}

	filterChange() {
		const newFilter = this.state.filter ? false : true;
		this.setState({
			filter: newFilter
		});
	}

	orderChange(event) {
		let newPlaylist;
		switch(event.target.value) {
			case "oldest":
				newPlaylist = this.state.playlist.sort(dateSort);
				break;
			case "newest":
				newPlaylist = this.state.playlist.sort(dateSort);
				newPlaylist.reverse();
				break;
			case "alphabetical":
				newPlaylist = this.state.playlist.sort(alphabeticalSort);
				break;
			case "reverseAlphabetical":
				newPlaylist = this.state.playlist.sort(alphabeticalSort);
				newPlaylist.reverse();
				break;
			default:
				break;
		}
		this.setState({
			playlist: newPlaylist
		});
	}

	render() {
		return (
			<div className="TrackList">
				<button className="ResetButton" onClick={this.props.onClick}><b>Choose Different Playlist</b></button>
				<h2>{this.props.playlistName}</h2>
				<div className="Sort">
					<form>
						<label>Sort By: </label>
						<select defaultValue={this.state.sort} onChange={this.orderChange.bind(this)}>
							<option value="oldest">Oldest First</option>
							<option value="newest">Newest First</option>
							<option value="alphabetical">A-Z</option>
							<option value="reverseAlphabetical">Z-A</option>
						</select>
					</form>
				</div>
				<br />
				{this.state.playlist.map((track, index) =>
					<Track key={index} data={track} onClick={() => this.props.trackSelect(track, this.state.playlist)} />
				)}
			</div>
		)
	}
}

export default TrackList;

function dateSort(a, b){
	var dateA = new Date(a.added_at);
	var dateB = new Date(b.added_at);
	return dateA - dateB;
}

function alphabeticalSort(a, b){
	var nameA = a.track.name.toUpperCase();
	var nameB = b.track.name.toUpperCase();
	if(nameA < nameB)
		return -1;
	if(nameB < nameA)
		return 1;
	return 0;
}
