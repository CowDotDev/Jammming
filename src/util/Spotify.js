const _clientId = 'ada297eef6b74df6a750b8fb6e5022e1';
const _secret = '4356ca0613e949b28419133b53020d4b';
const _redirectUri = 'http://localhost:3000/';
const _scope = 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
let _accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const Spotify = {
    setAccessToken(token) {
        _accessToken = token;
        localStorage.setItem('token',token);
    },
    getAccessToken() {
        return _accessToken;
    },
    hasAccessToken() {
        let token = this.getAccessToken();
        if(token) return true;

        // No access token, return false
        return false;
    },
    // Check if an auth code is on the URL
    getAuthCode() {
        return getParameterByName('code');
    },
    // For authorizeUser(), send the user to the Spotify authorization page with our client info
    getAuthorizeUserUrl() {
       return `https://accounts.spotify.com/authorize?client_id=${_clientId}&response_type=code&scope=${encodeURIComponent(_scope)}&redirect_uri=${encodeURIComponent(_redirectUri)}`;
    },

    // Request the Access Token with the Authorization Code
    async requestAccessToken() {
        return await fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token`, {
            method: 'POST',
            body: `grant_type=authorization_code&code=${this.getAuthCode()}&redirect_uri=${_redirectUri}`,
            headers: {
                'Authorization': 'Basic '+btoa(_clientId+":"+_secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(async (response) => {
            if(response.ok) {
                return await response.json();
            }
        });
    },

    // Search Spotify API with given search term
    async search(term) {
        if (term) {
            return await fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?q=${term}&type=track&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${_accessToken}`
                }
            }).then(response => {
                if(response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                let tracks = (jsonResponse.tracks && jsonResponse.tracks.items.length > 0 ? jsonResponse.tracks.items : []);
                // Grab all the information for all matched tracks and then return the result
                return tracks.map(function(track) {
                    return {
                        id: track.id,
                        album: track.album.name,
                        artist: track.artists[0].name,
                        title: track.name,
                        preview_url: track.preview_url
                    };
                });
            });
        } else {
            // No Terms have been set, should be caught by onSubmit callback, but if not... here is an empty object
            return new Promise(resolve => {
                resolve({});
            });
        }
    }
};

export default Spotify;