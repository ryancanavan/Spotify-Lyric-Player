import React from 'react';
import './Login.css';

function Login(props) {
  return (
    <div className="Login">
      <h3 style={{marginBottom:"-5px"}}>Login to Spotify to select a song to play!</h3>
      <br />
      {props.error && <h2>An error occurred. Please try again.</h2>}
      <a href="/spotifylogin"><button className="LoginButton"><b>Login With Spotify</b></button></a>
		</div>
  );
}

export default Login;
