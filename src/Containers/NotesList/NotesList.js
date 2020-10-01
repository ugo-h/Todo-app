import React, { Component } from 'react';
import './NotesList.css';
import Aux from '../../Components/Helper/Axillury';
import ModalConfirmDecline  from '../../Components/Modal/Modal';
import NotePreview from '../../Components/NotePreview/NotePreview';

class NotesList extends Component {
    state = { 
        notes: [],
        showModal: false
    };

    componentDidMount() {
        this.getNotesAndSetToState();
    };

    getNotesAndSetToState() {
        let notes = JSON.parse(localStorage.getItem('notes'));
        notes = notes? notes:[];
        this.setState({ notes });
    }
    async deleteHandler(id) {
        this.setState({showModal: true});
        this.id = id;

    }
    declineHandler() {
        this.setState({showModal: false})
    }
    confirmHandler() {
        this.setState({showModal: false})
        this.deleteNote(this.id)
    }
    deleteNote(id) {
        const notes = this.state.notes;
        const updatedNoted = notes.filter(note => note.id !== id)
        localStorage.setItem('notes', JSON.stringify(updatedNoted))
        this.setState({ notes: updatedNoted });
    }
    render() { 
        const notes = this.state.notes;
        return ( 
            <Aux>
                {notes.length > 0?
                    <ul className="NotesList">
                        {notes.map((note, index) => <NotePreview content={note} deleteHandler={this.deleteHandler.bind(this, note.id)} key={index}/>)}
                    </ul>
                :<h2 className="Utility__caption">There are no notes yet...</h2>}
                <ModalConfirmDecline 
                    isShown={this.state.showModal}
                    title="Delete"
                    
                    onConfirm={this.confirmHandler.bind(this)}
                    onDecline={this.declineHandler.bind(this)}
                >Do you want to delete this note?</ModalConfirmDecline>
            </Aux> 
        );
    }
};
 
export default NotesList;