import React from 'react';
import './Task.css';

const task = ({ content, disabled, deleteHandler }) => {
    return(
        <li className="Task">
            <input disabled={disabled} type="checkbox"/>
            <span>{content.title}</span>
            {disabled?'':  <button onClick={() => deleteHandler(content.id)} form="none" className="Task__delete-btn Utility__btn--danger">remove</button>}
        </li>
    )
}

export default task;