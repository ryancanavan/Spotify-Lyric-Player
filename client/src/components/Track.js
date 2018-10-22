import React from 'react';
import './Track.css';
import spotifyLogo from '../res/Spotify_Icon_Green.png';

function Track(props) {
	var artists = "";	
	props.data.track.artists.map((track) =>
        artists += track.name + ", "
	);
	artists = artists.substring(0, artists.length - 2);
	return (
		<div className="Track">
			<div className="TrackImage">
				{ props.data.track.album.images[0] ?
					<img src={props.data.track.album.images[0].url} alt="Track Icon" height="70px" width="70px" /> :
					<img src={spotifyLogo} alt="Spotify Logo" height="70px" width="70px" />
				}
			</div>
			<div className="TrackName">
				<h3>{props.data.track.name}</h3>
				<div className="ArtistName"><h5>{artists}</h5></div>
			</div>
		</div>
	)
}

export default Track;
