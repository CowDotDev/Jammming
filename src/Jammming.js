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
      
    };
  }

  render() {
    // Check to see if the user has an Access Token
    // We'll use this to either show the Search Bar or Log-in Button
    let isAuthorized = Spotify.hasAccessToken();

    return (
      <div className='Jammming'>
        <Header />
        {isAuthorized ? <SearchBar /> : <Login />}
      </div>
    );
  }
}

export default Jammming;
