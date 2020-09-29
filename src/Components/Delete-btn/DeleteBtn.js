import React from 'react';
import './Delete-btn.css'

const deleteBtn = ({ deleteHandler, size, id }) => {
    let cssMod = '';
    switch(size) {
        case 'small':
            cssMod = '--sm';
            break;
        case 'large':
            cssMod = '--lg'
            break;
        default: 
            cssMod = ''
    }
    return(
        <button className={`Delete-btn${cssMod}`} onClick={() => deleteHandler(id)} form="none">
            <img alt="delete" src="https://www.svgrepo.com/show/243868/delete.svg"/>
        </button>
    )
}

export default deleteBtn;