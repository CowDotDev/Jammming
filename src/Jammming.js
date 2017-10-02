import React, { Component } from 'react';
import Spotify from './util/Spotify.js';

import Header from './components/Header.js';
import Login from './components/Login.js';
import SearchBar from './components/SearchBar.js';
import SearchResults from './components/SearchResults.js';
import PlaylistViewer from './components/PlaylistViewer.js';

import './stylesheets/Jammming.css';

class Jammming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: Spotify.hasAccessToken(),
      isProcessingLogin: Spotify.getAuthCode()
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // Remove the access token from the session and reload the page
  handleLogOut() {
    Spotify.setAccessToken('');

    // I don't want to change the URL this way... 
    // but since we aren't using a Router, yet...
    // this seems like the best way to demonstrate state knowledge...
    // while still update the URL to handle refreshes.
    // (A refresh with 'code' in the URL would result in an immediate log-in. Don't want that)
    window.location.href = '/';
  }

  // We have are back from the Spotify Auth Log-In, request the access token with the new AuthCode
  getNewAccessToken() {
    Spotify.requestAccessToken().then(tokenResponse => {
      // Check to see if we were returned an access token
      if(tokenResponse.access_token) {
        // We have an access_token! Set it to the session, then refresh the page to get the updated state with the correct URL
        // Once again, not how'd like to handle the URL and State, but I don't want the code URL parameter anymore to prevent any issues.
        Spotify.setAccessToken(tokenResponse.access_token);
        window.location.href = '/';
      } else {
        // We do not have an access_token! Return to the base route, as it will check localStorage if we are in a funky place.
        // Otherwise, the user will be presented with the log-in screen
        window.location.href = '/';
      }
    });
  }

  // Search the Spotify API with the submitted term - populate search results with response
  handleSearch(term) {
    Spotify.search(term).then(response => {
      console.log(response);
    });
  }

  render() {
    // Look at our login status to see which view to load
    let view;
    if(this.state.isAuthorized) {
      // User has an access_token, take them to the logged in view
      view = (
        <div className='Jammming__resultsViewerContainer'>
          <SearchBar searchSpotify={this.handleSearch} />
          <SearchResults />
          <PlaylistViewer />
        </div>
      );
    } else if(this.state.isProcessingLogin) {
      // User just logged into Spotify OAuth, we now how an AuthCode
      // First, start the request to get the Access Token w/ the AuthCode
      // (In an ideal set-up the Spotify redirect_uri would point to an endpoint that would request the token before we render the page)
      this.getNewAccessToken();

      // Set View to loading message
      view = <p className='Jammming__loading'>Logging you into Spotify... Please wait</p>;
    } else {
      // User is not logged into Spotify
      view = <Login authorizeUserUrl={Spotify.getAuthorizeUserUrl()} />
    }

    return (
      <div className='Jammming'>
        <Header isAuthorized={this.state.isAuthorized} handleLogOut={this.handleLogOut} />
        {/* view = Either the Login, Loading, or SearchBar w/ Search Results & Playlist Viewer component(s), depending on log-in state */}
        {view}
      </div>
    );
  }
}

export default Jammming;
