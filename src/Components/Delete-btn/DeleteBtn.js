import React, { Component } from 'react';
import './Delete-btn.css'

const deleteBtn = ({ deleteHandler, size }) => {
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
        <button className={`Delete-btn${cssMod}`} onClick={deleteHandler} form="none">
            <img alt="delete" src="https://www.svgrepo.com/show/243868/delete.svg"/>
        </button>
    )
}


export default deleteBtn;