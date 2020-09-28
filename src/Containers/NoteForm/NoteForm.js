import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NoteForm extends Component {
    state = { 
        title: ''
     };
     
    inputChangeHandler(event) {
        const input = event.target;
        const name = input.name;
        this.setState({[name]: input.value})
    };

    submitHandler(event) {
        event.preventDefault();
        let notes = JSON.parse(localStorage.getItem('notes'));
        if(!notes) {
            notes = [];
        }
        const note = {title: this.state.title, id: Date.now().toString('16')};
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        this.props.history.push('/')
    };

    render() { 
        return ( 
            <form onSubmit={this.submitHandler.bind(this)}> 
                <label>title</label>
                <input name="title" value={this.state.title} onChange={this.inputChangeHandler.bind(this)}/>
                <input type="submit" value="Create"/>
            </form>
         );
    }
}
 
export default withRouter(NoteForm);