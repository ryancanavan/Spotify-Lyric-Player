import React from 'react';
import './Login.css';

function Login(props) {
  return (
    <div className="Login">
      <h3 style={{marginBottom:"-5px"}}>Login to Genius to view song lyrics!</h3>
      <br />
      {props.error && <h2>An error occurred. Please try again.</h2>}
      <a href="/geniuslogin"><button className="GeniusLoginButton"><b>Login With Genius</b></button></a>
		</div>
  );
}

export default Login;
