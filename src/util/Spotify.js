const _clientId = 'ada297eef6b74df6a750b8fb6e5022e1';
const _secret = '4356ca0613e949b28419133b53020d4b';
let _accessToken = '';

const Spotify = {
    getAccessToken() {
        return _accessToken;
    },
    hasAccessToken() {
        let token = this.getAccessToken();
        if(token && token != '') return true;
        return false;
    },

    authorizeUser() {
        
    }
};

export default Spotify;