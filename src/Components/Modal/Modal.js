import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css'
import Aux from '../Helper/Axillury';


const modalConfirmDecline = ({ isShown, title, body, onConfirm, onDecline }) => {
    return ReactDom.createPortal(
        <Aux>
       {isShown?
        <Aux>
        <div className="Backdrop"></div>
        <div className="Modal">
            <h2 className="Modal__title">{title}</h2>
            <p className="Modal_body">{body}</p>
            <div className="Modal__buttons">
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onDecline}>No</button>
            </div>
        </div>
        </Aux>
        : ''}
        </Aux>
        ,
        document.getElementById('portal')
    )
}
// function confirmModal( show, onDecline, onConfirm) {
//     const confirm = new Promise((res) => {
//         const submit = () => res(true)
//         const decline = () => res(false)
//         ReactDomrender(
//             <modalConfirmDecline
//                 isShown={show}
//                 title="Delete?"
//                 content=""
//                 onSubmit={submit}
//                 onDecline={decline}
//             />
//         )
//     }).then((res) => {
//         if(res) {
//             console.log('DELETING')
//         }else{
//             console.log('CANCEL')
//         }
//     }).finally(() => console.log('REMOVE MODAL'))
//     return confirm;
// }
export default modalConfirmDecline;