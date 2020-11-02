import React from 'react';
import TaskContext from './TaskContext';

const withContext = (Component) => {
    return (props) => (
        <TaskContext.Consumer>    
             {(context) => {
                return <Component {...props} context={context} />
             }}
        </TaskContext.Consumer>
    )
 }

 export default withContext;