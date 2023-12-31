import React, {useEffect, useState} from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import {Avatar, Typography} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const logo = 'https://img.icons8.com/dusk/64/movie-projector.png';
export const channel = 'https://yt3.googleusercontent.com/7q9t5rjeujEZYqY1xMLn0mvT4Zc6MaZBYgtseDL2_Zh42AOhMze8ep7BUKdR5FnxytMy3csj=s176-c-k-c0x00ffffff-no-rj';

function Header() {
  const [inputSearch, setInputSearch] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(Cookies.get("username"))
  }, []);


  const handleSearchClick = () => {
    if (inputSearch !== '') {
      navigate(`/search/${inputSearch}`);
    }
  };

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
        <SearchIcon onClick={handleSearchClick} className="header_inputButton" />
      </div>

      <div className="header_icons">
        <Link to='/upload'>
          <VideoCallIcon className='header_icon' />
        </Link>

        <Link to={`/profile/${username}`}>
          <Avatar className="header_icon" src="" alt="Avatar" /> <span/>
        </Link>
        <Link to={`/profile/${username}`}>
        <Typography>{username}</Typography>
        </Link>
      </div>
    </div>
  );
}

export default Header;
