import React from 'react';
import { Link } from 'react-router-dom';
import TasksList from '../Tasks/TasksList';
import DeleteBtn from '../Delete-btn/DeleteBtn';
import './NotePreview.css';

const notePreview = ({ content, deleteHandler }) => {
    return ( 
        <li className="NotesList__element Utility__card">
            <h2 className="NotesList__element__title">{content.title}</h2>
                <TasksList disabled={true} tasks={content.tasks} />
            {/* <button className="NotesList__element__delete-btn" onClick={deleteHandler}><img alt="delete" src="https://www.svgrepo.com/show/243868/delete.svg"/></button> */}
            <DeleteBtn className="NotesList__element__delete-btn" deleteHandler={deleteHandler}/>
            <Link to={`/note/${content.id}`} className="NotesList__element__open-btn Utility__btn--success">Open</Link>
        </li>
     );
}
 
export default notePreview;