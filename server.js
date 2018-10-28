var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var config = require('./config.json');

var spotify_client_id = config.SPOTIFY_CLIENT_ID; // Your client id
var spotify_client_secret = config.SPOTIFY_CLIENT_SECRET; // Your secret
var spotify_redirect_uri = config.SPOTIFY_REDIRECT_URI; // Your redirect uri
var genius_client_id = config.GENIUS_CLIENT_ID;
var genius_client_secret = config.GENIUS_CLIENT_SECRET;
var genius_redirect_uri = config.GENIUS_REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var spotifyStateKey = 'spotify_auth_state';
var geniusStateKey = 'genius_auth_state';

var app = express();

app.use(express.static(__dirname + '/client/build'))
   .use(cookieParser());

app.get('/spotifylogin', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(spotifyStateKey, state);

  // your application requests authorization
  var scope = 'playlist-read-collaborative playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: spotify_redirect_uri,
      state: state
    }));
});

app.get('/spotifycallback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[spotifyStateKey] : null;

  if (state === null || state !== storedState) {
    res.cookie('slp_sle', 'state_mismatch', { maxAge: 3600000 });
    res.redirect('/');
  } else {
    res.clearCookie(spotifyStateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.cookie('slp_sat', access_token, { maxAge: 3600000 });
        res.cookie('slp_srt', refresh_token, { maxAge: 3600000 });
        res.redirect('/');
      } else {
        res.cookie('slp_sle', 'invalid_token', { maxAge: 3600000 });
        res.redirect('/');
      }
    });
  }
});

app.get('/spotify_refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/geniuslogin', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(geniusStateKey, state);

  // your application requests authorization
  res.redirect('https://api.genius.com/oauth/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: genius_client_id,
      scope: '',
      redirect_uri: genius_redirect_uri,
      state: state
    }));
});

app.get('/geniuscallback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[geniusStateKey] : null;

  if (state === null || state !== storedState) {
    res.cookie('slp_gle', 'state_mismatch', { maxAge: 3600000 });
    res.redirect('/');
  } else {
    res.clearCookie(geniusStateKey);
    var authOptions = {
      url: 'https://api.genius.com/oauth/token',
      form: {
        code: code,
        client_id: genius_client_id,
        client_secret: genius_client_secret,
        redirect_uri: genius_redirect_uri,
        response_type: 'code',
        grant_type: 'authorization_code'
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      console.log('error',error);
      console.log('status',response.statusCode);
      console.log('body',body);
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token;

        // we can also pass the token to the browser to make requests from there
        res.cookie('slp_gat', access_token, { maxAge: 3600000 });
        res.redirect('/');
      } else {
        res.cookie('slp_gle', 'invalid_token', { maxAge: 3600000 });
        res.redirect('/');
      }
    });
  }
});

console.log('Listening on 3001');
app.listen(3001);