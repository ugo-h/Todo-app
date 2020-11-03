import React from 'react';
import './Task.css';
import { Delete, Edit, CheckMark } from '../../Button/Button';
import withContext from '../../../Context/taskContextHoc';

const task = ({ content, disabled, deleteHandler, editHandler, checkHandler, context }) => {
    let taskId, taskValue, inputHandler, updateTasksHandler, isEditable;
    if(!disabled) {
        taskId = context.taskId;
        taskValue = context.taskValue;
        inputHandler = context.inputHandler;
        updateTasksHandler = context.updateTasksHandler;
        isEditable = taskId === content.id;
    };

    function submitTaskOnEnterHandler(ev) {
        if(ev.key !== 'Enter') return;
        updateTasksHandler();
    };
    return(
        <li className="Task">
            <input className="Task__checkbox" checked={content.isChecked} value={content.isChecked} onChange={() => checkHandler(content.id)} id={content.id} disabled={disabled} type="checkbox" from="none"/>
            {isEditable?<input className="Task__input" onKeyDown={submitTaskOnEnterHandler} autoFocus={true} name="currentEditableTask" onBlur={updateTasksHandler} onChange={inputHandler} value={taskValue}/>:<label htmlFor={content.id} className="Task__content">{content.title}</label>}
            {disabled?'':   
            <div className="Task__buttons">
                {isEditable?<CheckMark size="small" clickHandler={() => updateTasksHandler()}/>:<Edit size="small" clickHandler={editHandler}/>}
                <Delete size="small" clickHandler={() => deleteHandler(content.id)}/>
            </div>}
        </li>
    )
}

export default withContext(task);