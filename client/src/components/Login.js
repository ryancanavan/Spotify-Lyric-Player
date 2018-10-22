import React from 'react';
import './Login.css';

function Login(props) {
  return (
    <div className="Login">
      <h3 style={{marginBottom:"-5px"}}>Read the lyrics to your favorite songs as they play!</h3>
      <h3>Login to get started!</h3>
      <br />
      {(props.error !== "") && <h2>An error occurred. Please try again.</h2>}
      <a href="/login"><button className="LoginButton"><b>Login With Spotify</b></button></a>
		</div>
  );
}

export default Login;
