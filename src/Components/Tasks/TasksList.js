import React from 'react';
import './TasksList.css';
import Task from './Task/Task';
import Aux from '../Helper/Axillury';

const tasksList = ({ tasks, disabled }) => {
    return(
        <Aux>{
            tasks?
            <ul className="TasksList">
                {tasks.map(task => <Task disabled={disabled} content={task}/>)}
            </ul>
            :<h3 className="Utility__caption">No tasks yet</h3>    
        }</Aux>
    )
}

export default tasksList;