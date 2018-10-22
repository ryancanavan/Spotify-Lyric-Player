import React from 'react';
import './Playlist.css';
import spotifyLogo from '../res/Spotify_Icon_Green.png';

function Playlist(props) {
	return (
		<div>
			<a onClick={props.onClick}>
				<div className="Playlist">
					<div className="PlaylistImage">
						{ props.data.images[0] ?
							<img src={props.data.images[0].url} alt="Track Icon" height="100px" width="100px" /> :
							<img src={spotifyLogo} alt="Spotify Logo" height="100px" width="100px" />
						}
					</div>
					<div className="PlaylistName">
						<h2>{props.data.name}</h2>
					</div>
				</div>
			</a>
		</div>
	)
}

export default Playlist;