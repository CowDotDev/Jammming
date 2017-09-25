import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(e) {
        e.preventDefault();
        let term = document.getElementById("searchTerms").value;
        let results = await this.props.searchSpotify(term);
        console.log(results)
    }
    render() {
        return (
            <form className="SearchBar" onSubmit={this.handleSubmit} action="#">
                <label htmlFor="searchTerms" className="SearchBar__label">Song Title, Artist, or Album</label>
                <input type="text" className="SearchBar__input" name="searchTerms" id="searchTerms" placeholder="Search by Song Title, Artist or Album..." required />
                <input type="submit" className="SearchBar__submit" value="Search" />
            </form>
        );
    }
}

export default SearchBar;