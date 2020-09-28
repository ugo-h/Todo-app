import React from 'react';
import './TasksList.css';
import Task from './Task/Task';
import Aux from '../Helper/Axillury';

const tasksList = ({ tasks, disabled, deleteHandler }) => {
    return(
        <Aux>{
            tasks.length> 0?
            <ul className="TasksList">
                {tasks.map((task, index) => <Task disabled={disabled} content={task} deleteHandler={deleteHandler} key={task.id}/>)}
            </ul>
            :<h3 className="Utility__caption">No tasks yet</h3>    
        }</Aux>
    )
}

export default tasksList;