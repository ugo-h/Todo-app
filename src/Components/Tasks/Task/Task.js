import React from 'react';
import './Task.css';
import DeleteBtn from '../../Delete-btn/DeleteBtn';

const task = ({ content, disabled, deleteHandler }) => {
    return(
        <li className="Task">
            <input id={content.id} disabled={disabled} type="checkbox" from="none"/>
            <label for={content.id} className="Task__content">{content.title}</label>
            {disabled?'':  <DeleteBtn size="small" id={content.id} deleteHandler={deleteHandler}/>}
        </li>
    )
}

export default task;