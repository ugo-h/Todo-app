import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css'
import Aux from '../Helper/Axillury';


const modalConfirmDecline = ({ isShown, title, children, onConfirm, onDecline }) => {
    return ReactDom.createPortal(
        <Aux>
       {isShown?
        <Aux>
        <div className="Backdrop"></div>
        <div className="Modal Utility__card">
            <h2 className="Modal__title">{title}</h2>
            <p className="Modal_body">{children}</p>
            <div className="Modal__buttons">
                <button className="Utility__btn--danger"onClick={onConfirm}>Delete</button>
                <button  className="Utility__btn" onClick={onDecline}>Cancel</button>
            </div>
        </div>
        </Aux>
        : ''}
        </Aux>
        ,
        document.getElementById('portal')
    )
}
export default modalConfirmDecline;