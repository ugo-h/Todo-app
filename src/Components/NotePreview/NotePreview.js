import React from 'react';
import TasksList from '../Tasks/TasksList';
import './NotePreview.css';

const notePreview = ({ content, deleteHandler }) => {
    return ( 
        <li className="NotesList__element Utility__card">
            <h2 className="NotesList__element__title">{content.title}</h2>
                <TasksList disabled="true" tasks={content.tasks}/>
            <button className="Utility__btn--danger" onClick={deleteHandler}>Delete</button>
        </li>
     );
}
 
export default notePreview;