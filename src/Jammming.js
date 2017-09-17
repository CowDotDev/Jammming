import React, { Component } from 'react';
import Spotify from './util/Spotify.js';

import Header from './components/Header.js';
import SearchBar from './components/SearchBar.js';
import Login from './components/Login.js';

import './stylesheets/Jammming.css';

class Jammming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: Spotify.hasAccessToken() // We'll use this to either show the Search Bar or Log-in Button
    };

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    Spotify.setAccessToken('');
    this.setState({
      isAuthorized: false
    });

    // I don't want to change the URL this way... 
    // but since we aren't using a Router, yet...
    // this seems like the best way to demonstrate state knowledge...
    // while still update the URL to handle refreshes.
    // (A refresh with 'code' in the URL would result in an immediate log-in. Don't want that)
    window.location.href = '/';
  }

  render() { 
    return (
      <div className='Jammming'>
        <Header isAuthorized={this.state.isAuthorized} handleLogOut={this.handleLogOut} />
        {this.state.isAuthorized ? <SearchBar /> : <Login authorizeUserUrl={Spotify.getAuthorizeUserUrl()} />}
      </div>
    );
  }
}

export default Jammming;
