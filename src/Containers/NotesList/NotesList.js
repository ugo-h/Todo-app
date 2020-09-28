import React, { Component } from 'react';
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
        const notes = JSON.parse(localStorage.getItem('notes'));
        this.setState({ notes });
    }
    async deleteHandler(id) {
        this.setState({showModal: true})
        // confirmModal(true, this.declineHandler, this.confirmHandler)
    }
    declineHandler() {
        this.setState({showModal: false})
        console.log('nothing')
    }
    confirmHandler() {
        this.setState({showModal: false})
        console.log('deleted')
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
                {notes?
                    <ul>
                        {notes.map((note, index) => <NotePreview content={note} deleteHandler={this.deleteHandler.bind(this, note.id)} key={index}/>)}
                    </ul>
                :<h2>There are no notes yet...</h2>}
                <ModalConfirmDecline 
                    isShown={this.state.showModal}
                    title="Are you sure?"
                    content=""
                    onConfirm={this.confirmHandler.bind(this)}
                    onDecline={this.declineHandler.bind(this)}
                 />
            </Aux> 
        );
    }
};
 
export default NotesList;