import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const header = props => (
    <header className="Header">
        <nav className="Header__nav">
            <Link className="Header__nav__el" to="/">My Notes</Link>
            <Link className="Header__nav__el" to="/note/new/clear">New Note</Link>
        </nav>
    </header>
)

export default  header;