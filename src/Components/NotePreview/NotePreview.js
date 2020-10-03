import React from 'react';
import { Link } from 'react-router-dom';
import TasksList from '../Tasks/TasksList';
import { Delete } from '../Button/Button';

import './NotePreview.css';

const notePreview = ({ content, deleteHandler }) => {
    return ( 
        <li className="NotesList__element Utility__card">
            <h2 className="NotesList__element__title">{content.title}</h2>
                <TasksList disabled={true} tasks={content.tasks} />
            <Delete className="NotesList__element__delete-btn" clickHandler={deleteHandler}/>
            <Link to={`/note/${content.id}`} className="NotesList__element__open-btn Utility__btn--success">Open</Link>
        </li>
     );
}
 
export default notePreview;