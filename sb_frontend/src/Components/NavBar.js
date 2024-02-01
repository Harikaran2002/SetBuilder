import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <Link to="/">Dataset</Link>
                <Link to="/newSet">+ Set</Link>
            </nav>
        </div>
    );
};

export default Navbar;
