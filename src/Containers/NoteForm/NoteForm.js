import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './NoteForm.css';
import TasksList from '../../Components/Tasks/TasksList';
import HistoryNode from './History';

class NoteForm extends Component {
    state = { 
        title: '',
        tasks: [],
        task: '',
        history: null,
        allowEditing: true,
        allowAddingTasks: true,
     };
     
     componentDidMount() {
        const match = this.props.match;
        const id = match.params.id;
        console.log(id)
        if(!id || id === 'new') return;
        const noteData = this.getDataFromLocalStorage(id);
        console.log(noteData)
        this.id = id;
        this.setState({title: noteData.title, tasks: noteData.tasks, allowAddingTasks: false, allowEditing: false})
     }

     getDataFromLocalStorage(id) {
         const data = JSON.parse(localStorage.getItem('notes'));
         return data.find((note) => note.id === id)
     }

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
        const note = {title: this.state.title, tasks: this.state.tasks};
        const existingNoteIndex = notes.findIndex(exNote => exNote.id === this.id);
        console.log(existingNoteIndex)
        if(existingNoteIndex>=0) {
            note.id = this.id;
            notes[existingNoteIndex] = note;
        } else {
            note.id = Date.now().toString('16');
            notes.push(note);
        }
        localStorage.setItem('notes', JSON.stringify(notes));
        this.props.history.push('/')
    };
    submitTaskHandler(ev) {
        if(ev.key!=='Enter') return;
        this.addTask();
    }
    addTask() {
        const tasks = [...this.state.tasks];
        tasks.push({title: this.state.task, id: Date.now().toString(16), isChecked: false});
        this.setState({ tasks, task: '' })
    }
    deleteHandler(id) {
        const tasks = [...this.state.tasks];
        const newTasks = tasks.filter(task => task.id!==id);
        this.setState({tasks: newTasks})

    }
    checkHandler(id) {
        const tasks = [...this.state.tasks];
        const taskIndex = tasks.findIndex((task) => task.id === id)
        tasks[taskIndex].isChecked = !tasks[taskIndex].isChecked;
        this.setState({ tasks })
        console.log('checked')
        console.log(tasks[taskIndex])
    }
    addToHistory() {
        const currentState = {...this.state};
        if(!this.state.history) {
            this.setState({ history: new HistoryNode(currentState) })
        } else {
            const history = this.state.history.insert(currentState)
            this.setState({ history })
        }
    }
    render() { 
        const tasks = this.state.tasks;
        const allowEditing = this.state.allowEditing;
        const allowAddingTasks = this.state.allowAddingTasks;
        return ( 
            <form className="NoteForm Utility__card" onSubmit={this.submitHandler.bind(this)}> 
                <label className="NoteForm__field" onClick={() => this.setState({allowEditing: true})}>
                    Title:
                    {allowEditing?
                    <input className="NoteForm__field__input" form="none" onBlur={() => this.setState({allowEditing: false})} name="title" value={this.state.title} onChange={this.inputChangeHandler.bind(this)}/>
                    :<h3 className="NoteForm__title">{this.state.title}<img alt="edit" src="https://www.svgrepo.com/show/61278/edit.svg"/></h3>
                    }
                </label>
                <label className="NoteForm__field">
                    Tasks:
                    </label>
                    <div className="NoteForm__field">
                    {tasks.length > 0? <TasksList tasks={tasks} deleteHandler={this.deleteHandler.bind(this)} checkHandler={this.checkHandler.bind(this)}/>: null}
                    {allowAddingTasks?
                    <input className="NoteForm__field__input" onBlur={() => this.setState({allowAddingTasks: false})}  onKeyDown={this.submitTaskHandler.bind(this)} name="task" form="none" value={this.state.task} onChange={this.inputChangeHandler.bind(this)}/>
                    : <button onClick={()=>this.setState({allowAddingTasks:true})} className="NoteForm__btn Utility__btn--alert">Add Task</button>}
                    </div>
                <input className="NoteForm__btn--right Utility__btn--success" type="submit" value="Save Changes"/>
            </form>
         );
    }
}
 
export default withRouter(NoteForm);