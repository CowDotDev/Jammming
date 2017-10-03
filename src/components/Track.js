import React from 'react';

import '../stylesheets/Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.handlePreviewClick = this.handlePreviewClick.bind(this);
    }
    handlePreviewClick(e) {
        // There is an issue playing HTTPS files with HTML5, change it to non-secure
        let preview = this.props.info.preview_url.replace('https://','http://')+".mp3";
        this.props.playPreview(preview);
    }
    render() {
        let track = this.props.info;
        return (
            <div className='Track'>
                <img className='Track__albumArt' src={track.albumImage ? track.albumImage : '../images/genericAlbumCover.jpg'} alt={track.album} />
                {track.preview_url ? <span className='Track__playPreviewOverlay' onClick={this.handlePreviewClick}><i className='fa fa-play-circle'></i></span> : ''}
                <div className='Track__infoContainer'>
                    <h3 className='Track__title'>{track.title}</h3>
                    <h4 className='Track__artistAlbum'>{track.artist} - {track.album}</h4>
                </div>
            </div>
        );
    }
}

export default Track;