const credentials = require('./private');
const constants = require('../../constants');

var axios = require('axios');
var querystring = require('querystring');

const SPOTIFY_GET_TOKEN = 'https://accounts.spotify.com/api/token'
const SPOTIFY_SEARCH = 'https://api.spotify.com/v1/search'

function refresh(refresh_token) {
  var headers = {
    "Content-Type":'application/x-www-form-urlencoded'
  }

  var config = {
    headers: headers
  }

  var data = {
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
    client_id: credentials.CLIENT_ID,
    client_secret: credentials.CLIENT_SECRET
  }

  const request = axios.post(SPOTIFY_GET_TOKEN, querystring.stringify(data), config)
  return request;
}

function swap(code) {
  var headers = {
    "Content-Type":'application/x-www-form-urlencoded'
  }

  var config = {
    headers: headers
  }
  var data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: constants.SPOTIFY_REDIRECT_URL,
    client_id: credentials.CLIENT_ID,
    client_secret: credentials.CLIENT_SECRET
  }

  const request = axios.post(SPOTIFY_GET_TOKEN, querystring.stringify(data), config)

  return request;
}

function getServerToken() {
  var headers = {
    "Content-Type":'application/x-www-form-urlencoded',
    "Authorization": `Basic ${Buffer.from(credentials.CLIENT_ID + ":" + credentials.CLIENT_SECRET).toString('base64')}`
  }
  var config = {
    headers: headers
  }
  var data = {
    grant_type: 'client_credentials'
  }
  return axios.post(SPOTIFY_GET_TOKEN, querystring.stringify(data), config)
}

function search(query) {
  return getServerToken().then(({data}) => {
    const {access_token} = data

    var headers = {
      "Authorization": `Bearer ${access_token}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    }

    var params = {
      q: `${query.trim()}`,
      type: 'album,artist,playlist,track'
    }

    var config = {
      headers,
      params: params
    }

    return axios.get(SPOTIFY_SEARCH, config)

  }).catch((e) => {
    console.log(e)
  })
}

module.exports = {
  refresh,
  swap,
  search,
}
