// Description: This file contains the main component of the website.
// Name: Nicole Sparkes
// Date: 12/06/2024

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import headerBG from '../Images/header.jpeg'

function Header() {
    return (
        <header className ="header" style={{backgroundImage: `url(${headerBG})`}}>
            <h1>What's for Dinner?</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/favourites">Favourites</Link>
                <Link to="/cart">Cart</Link>
            </nav>
        </header>
    );
}

export default Header;