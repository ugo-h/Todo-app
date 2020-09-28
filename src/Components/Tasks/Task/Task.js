import React from 'react';
import './Task.css';

const task = ({ content, disabled }) => {
    return(
        <li className="Task">
            <input disabled={disabled} type="radio"/>
            <span>{content}</span>
        </li>
    )
}

export default task;