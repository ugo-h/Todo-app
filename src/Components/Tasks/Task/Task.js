import React from 'react';
import './Task.css';
import { Delete, Edit } from '../../Button/Button';

const task = ({ content, disabled, deleteHandler, editHandler, checkHandler }) => {
    return(
        <li className="Task">
            <input checked={content.isChecked} value={content.isChecked} onChange={() => checkHandler(content.id)} id={content.id} disabled={disabled} type="checkbox" from="none"/>
            <label htmlFor={content.id} className="Task__content">{content.title}</label>
            <div className="Task__buttons">
                <Edit size="small" clickHandler={editHandler}/>
                {disabled?'':  <Delete size="small" clickHandler={() => deleteHandler(content.id)}/>}
            </div>
        </li>
    )
}

export default task;