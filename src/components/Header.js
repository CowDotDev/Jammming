import React from 'react';
import '../stylesheets/Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <h1 className='logo'>Ja<span className='logo__highlight'>mmm</span>ing</h1>
            </div>
        );
    }
}

export default Header;