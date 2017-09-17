const _clientId = 'ada297eef6b74df6a750b8fb6e5022e1';
const _secret = '4356ca0613e949b28419133b53020d4b';
const _redirectUri = 'http://localhost:3000/';
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
        console.log(_accessToken);
        return _accessToken;
    },
    hasAccessToken() {
        let token = this.getAccessToken();
        if(token) return true;
        
        // Check to see if token is in URL (from recent autorization)
        let code = getParameterByName('code');
        if(code) {
            localStorage.setItem('token',code);
            this.setAccessToken(code); // Set token for this page view, since it is set on the localStore next page refresh will grab it there.
            return true;
        }

        // No access token set/on the URL, return false
        return false;
    },
    // For authorizeUser(), send the user to the Spotify authorization page with our client info
    getAuthorizeUserUrl() {
       return `https://accounts.spotify.com/authorize?client_id=${_clientId}&response_type=code&redirect_uri=${encodeURIComponent(_redirectUri)}`;
    }
};

export default Spotify;