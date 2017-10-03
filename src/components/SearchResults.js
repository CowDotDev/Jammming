import React from 'react';
import Track from './Track.js';
import AudioPlayer from './AudioPlayer.js';

import '../stylesheets/SearchResults.css';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            audioFile: ''
        };
        this.playPreviewAudio = this.playPreviewAudio.bind(this);
    }

    // Function to play a searched track's preview audio file
    playPreviewAudio(newAudioFile) {
        // Check to see if we are able to use HTMLAudioElement methods
        if(window.HTMLAudioElement) {
            // Stop audio player if currently playing
            document.querySelector('.AudioPlayer').pause();
            // Update state to new audioFile if current src is different
            if(newAudioFile !== this.state.audioFile) {
                this.setState({
                    audioFile: newAudioFile
                }, () => {
                    // Play the new audio file
                    document.querySelector('.AudioPlayer').play();
                });
            } else {
                document.querySelector('.AudioPlayer').play();
            }
        }
    }

    render() {
        let view;
        if(this.props.term !== "") {
            // There is a Search Term, populate with results and show result count
            let playPreview = this.playPreviewAudio;
            view = (
                <div className='SearchResults__tracks'>
                    <p className='SearchResults__count'>{this.props.results.length} Results</p>
                    {
                        this.props.results.map(function(track) {
                            return <Track key={track.id} info={track} playPreview={playPreview} />
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
                <AudioPlayer src={this.state.audioFile} />
                <div className='SearchResults__content'>
                    <h2 className='SearchResults__header'>Search Results: <span className='SearchResults__term'>{this.props.term}</span></h2>
                    {view}
                </div>
            </div>
        );
    }
}

export default SearchResults;