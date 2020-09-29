import React from 'react';
import './Task.css';
import DeleteBtn from '../../Delete-btn/DeleteBtn';

const task = ({ content, disabled, deleteHandler, checkHandler }) => {
    return(
        <li className="Task">
            <input checked={content.isChecked} value={content.isChecked} onChange={() => checkHandler(content.id)} id={content.id} disabled={disabled} type="checkbox" from="none"/>
            <label htmlFor={content.id} className="Task__content">{content.title}</label>
            {disabled?'':  <DeleteBtn size="small" id={content.id} deleteHandler={deleteHandler}/>}
        </li>
    )
}

export default task;