import React from 'react';
import Track from './Track.js';

import '../stylesheets/SearchResults.css';

class SearchResults extends React.Component {
    render() {
        let view;
        console.log(this.props.term, this.props.results);
        if(this.props.term != "") {
            // There is a Search Term, populate with results and show result count
            view = (
                <div className='SearchResults__tracks'>
                    <p className='SearchResults__count'>{this.props.results.length} Results</p>
                    {
                        this.props.results.map(function(track) {
                            return <Track key={track.id} info={track} />
                        })
                    }
                </div>
            );
        } else {
            // No Search Term, prompt user to search
            view = <p className='SearchResults__message'>Use the Search Bar above to view tracks.</p>
        }

        return (
            <div className='SearchResults'>
                <div className='SearchResults__content'>
                    <h2 className='SearchResults__header'>Search Results: <span className='SearchResults__term'>{this.props.term}</span></h2>
                    {view}
                </div>
            </div>
        );
    }
}

export default SearchResults;