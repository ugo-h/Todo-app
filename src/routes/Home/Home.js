import React from 'react';
import { Link } from 'react-router-dom';
import NotesList from '../../Containers/NotesList/NotesList';

const home = (pops) => {
    return(
        <div>
            <h1>Home</h1>
             <Link to="/note/new">Create new note</Link>
             <NotesList/>
        </div>
    )
}

export default home;