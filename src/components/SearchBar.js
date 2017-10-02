import React from 'react';

import '../stylesheets/SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleKeyUp(e) {
        // When a key is pressed check to see if the length of the search term is greater than one.
        // If length is greater than one, show label. If less than one, remove label.
        let term = document.getElementById('searchTerms').value,
            label = document.querySelector('.SearchBar__label'),
            classNames = label.className+' '; // Extra space to help substring find the correct class
        if(term && term.length >= 1) {
            // Add the show class if it isn't already there
            if(classNames.indexOf(' show ') < 0) {
                label.className += ' show';
            }
            // Remove the disabled attribute from submit button
            document.querySelector('.SearchBar__submit').disabled = false;
        } else {
            // Remove the show class
            label.className = classNames.replace(' show ', '');
            // Add the disabled attribute to submit button
            document.querySelector('.SearchBar__submit').disabled = true;
        }
    }
    handleSubmit(e) {
        // Grab the search term, make sure it isn't empty and submit the search
        e.preventDefault();
        let term = document.getElementById("searchTerms").value;
        if(term && term !== "") {
            this.props.searchSpotify(term);
        }
    }
    render() {
        return (
            <form className="SearchBar" onSubmit={this.handleSubmit} action="#">
                <div className="SearchBar__inputGroup">
                    <input onKeyUp={this.handleKeyUp} type="text" className="SearchBar__input" name="searchTerms" id="searchTerms" placeholder="Search by Song Title, Artist or Album..." required />
                    <label htmlFor="searchTerms" className="SearchBar__label">Song Title, Artist, or Album</label>
                </div>
                <input type="submit" className="SearchBar__submit" value="Search" disabled />
            </form>
        );
    }
}

export default SearchBar;