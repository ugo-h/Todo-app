import React from 'react';

const notePreview = ({ content, deleteHandler }) => {
    return ( 
        <li>
            <h2>{content.title}</h2>
            <p>Dummy content...</p>
            <button onClick={deleteHandler}>Delete</button>
        </li>
     );
}
 
export default notePreview;