import React from 'react';
// import { Link } from 'react-router-dom';
import NotesList from '../../Containers/NotesList/NotesList';

const home = (pops) => {
    return(
        <div className="Layout__main"> 
             {/* <Link className="Utility__btn--success" to="/note/new">Create Note</Link> */}
             <NotesList/>
        </div>
    )
}

export default home;