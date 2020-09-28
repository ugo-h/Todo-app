import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './NoteForm.css';
// import Task from '../../Components/Tasks/Task/Task';
import TasksList from '../../Components/Tasks/TasksList';

class NoteForm extends Component {
    state = { 
        title: '',
        tasks: [],
        task: '',
        allowEditing: true
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
        const note = {title: this.state.title, id: Date.now().toString('16'), tasks: this.state.tasks};
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        this.props.history.push('/')
    };
    submitTaskHandler(ev) {
        if(ev.key!=='Enter') return;
        this.addTask();
    }
    addTask() {
        const tasks = [...this.state.tasks];
        tasks.push({title: this.state.task, id: Date.now().toString(16)});
        this.setState({ tasks, task: '' })
    }
    deleteHandler(id) {
        const tasks = [...this.state.tasks];
        const newTasks = tasks.filter(task => task.id!==id);
        this.setState({tasks: newTasks})

    }
    render() { 
        const tasks = this.state.tasks;
        const allowEditing = this.state.allowEditing;
        return ( 
            <form className="NoteForm Utility__card" onSubmit={this.submitHandler.bind(this)}> 
                <label className="NoteForm__field" onClick={() => this.setState({allowEditing: true})}>
                    Title:
                    {allowEditing?
                    <input form="none" onBlur={() => this.setState({allowEditing: false})} name="title" value={this.state.title} onChange={this.inputChangeHandler.bind(this)}/>
                    :<h3>{this.state.title}</h3>
                    }
                </label>
                <label className="NoteForm__field">
                    Tasks:
                    {tasks.length > 0? <TasksList tasks={tasks} deleteHandler={this.deleteHandler.bind(this)}/>: null}
                    <input onKeyDown={this.submitTaskHandler.bind(this)} name="task" form="none" value={this.state.task} onChange={this.inputChangeHandler.bind(this)}/>
                </label>
                <input type="submit" value="Create"/>
            </form>
         );
    }
}
 
export default withRouter(NoteForm);