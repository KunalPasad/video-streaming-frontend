import React, { useState } from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
export const logo = 'https://img.icons8.com/dusk/64/movie-projector.png';

function Header() {
    const [inputSearch, setInputSearch] = useState('');

    return (
        <div className="header">
            <div className="header_left">
                <MenuIcon className="header_icon" />
                <Link to='/home'>
                    <img className="header_logo" src={logo} alt="logo" />
                </Link>
            </div>
            <div className="header_input">
                <input
                    onChange={(e) => setInputSearch(e.target.value)}
                    value={inputSearch}
                    type="text"
                    placeholder='Search'
                />
                <Link to={`/search/${inputSearch}`}>
                    <SearchIcon className="header_inputButton" />
                </Link>
            </div>
            <div className="header_icons">
                <Link to='/upload'>
                <VideoCallIcon className='header_icon' />
                </Link>
                <Link to='/profile'>
                <Avatar className='header_icon' src="" alt="Avatar" />
            </Link>

            </div>
        </div>
    );
}

export default Header;
