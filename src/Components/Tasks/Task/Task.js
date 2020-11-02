import React from 'react';
import './Task.css';
import { Delete, Edit } from '../../Button/Button';
import withContext from '../../../Context/taskContextHoc';

const task = ({ content, disabled, deleteHandler, editHandler, checkHandler, context }) => {
    let taskId, taskValue, inputHandler, updateTasksHandler, isEditable;
    if(!disabled) {
        taskId = context.taskId;
        taskValue = context.taskValue;
        inputHandler = context.inputHandler;
        updateTasksHandler = context.updateTasksHandler;
        isEditable = taskId === content.id;
    }
    return(
        <li className="Task">
            <input checked={content.isChecked} value={content.isChecked} onChange={() => checkHandler(content.id)} id={content.id} disabled={disabled} type="checkbox" from="none"/>
            {isEditable?<input autoFocus={true} name="currentEditableTask" onBlur={updateTasksHandler} onChange={inputHandler} value={taskValue}/>:<label htmlFor={content.id} className="Task__content">{content.title}</label>}
            {disabled?'':   
            <div className="Task__buttons">
                <Edit size="small" clickHandler={editHandler}/>
                <Delete size="small" clickHandler={() => deleteHandler(content.id)}/>
            </div>}
        </li>
    )
}

export default withContext(task);