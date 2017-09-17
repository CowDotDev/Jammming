import React from 'react';
import '../stylesheets/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let isAuthorized = this.props.isAuthorized;
        return (
            <div className="Header">
                <h1 className='logo'>
                    Ja<span className='logo__highlight'>mmm</span>ing
                    {isAuthorized ? <p className='logo__logOut' onClick={this.props.handleLogOut}>- Sign Out</p> : ''}
                </h1>
            </div>
        );
    }
}

export default Header;