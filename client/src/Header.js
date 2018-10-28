import React from 'react';
import './Header.css';
import spotifyLogo from './res/Spotify_Icon_Green.png';

function Header() {
	return (
		<div className="Header">
			<img className="Logo" src={spotifyLogo} alt="Spotify Logo" height="50" width="50" /> 
			<h1 className="Title">Spotify Lyric Player</h1>
		</div>
	);
}

export default Header;
