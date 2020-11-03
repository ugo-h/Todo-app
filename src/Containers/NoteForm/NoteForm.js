import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './NoteForm.css';
import TasksList from '../../Components/Tasks/TasksList';
import { Undo, Redo } from '../../Components/Button/Button';
import TaskContext from '../../Context/TaskContext';

class NoteForm extends Component {
    state = { 
        title: '',
        tasks: [],
        task: '',
        history: [],
        historyPointer: -1,
        allowEditing: true,
        allowAddingTasks: true,
        currentEditableTaskId: 0,
        currentEditableTask: ''
     };
     
     componentDidMount() {    
        const match = this.props.match;
        const id = match.params.id;
        if(!id || id === 'new') return;
        const note = this.getDataFromLocalStorage(id);
        this.id = id;
        this.setState({title: note.title, tasks: note.tasks, allowAddingTasks: false, allowEditing: false})
        this.addToHistory({tasks: note.tasks});
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
    setCurrentEditableTask(event) {
        const { value } = event.target;
        this.setState({ currentEditableTask: value })
    }

    updateTasks() {
        const editableId = this.state.currentEditableTaskId;
        const editedTask = this.state.currentEditableTask;
        const tasks = [...this.state.tasks];
        let index;
        tasks.forEach((task, i) => {
            if(task.id === editableId) {
                index = i;
                return;
            }
        })
        const updatedTask = {
            title: editedTask,
            id: editableId,
            isChecked: false
        };
        if(tasks[index].title !== updatedTask.title) {
            tasks[index] = updatedTask;
            this.addToHistory({ tasks });
            this.setState({ tasks, currentEditableTask:'', currentEditableTaskId: 0 })
            return;
        }
        this.setState({ currentEditableTask:'', currentEditableTaskId: 0 })
    }

    submitHandler(event) {
        event.preventDefault();
        let notes = JSON.parse(localStorage.getItem('notes'));
        if(!notes) {
            notes = [];
        }
        const note = {title: this.state.title, tasks: this.state.tasks};
        const existingNoteIndex = notes.findIndex(exNote => exNote.id === this.id);
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
        this.setState({ tasks, task: '' });
        this.addToHistory({ tasks });
    }
    deleteHandler(id) {
        const tasks = [...this.state.tasks];
        const newTasks = tasks.filter(task => task.id!==id);
        this.setState({ tasks: newTasks })
        this.addToHistory({ tasks: newTasks });
    }

    editTaskHandler(id, value) {
        let { currentEditableTaskId, currentEditableTask } = this.state;
        currentEditableTaskId = id;
        currentEditableTask = value;
        this.setState({ currentEditableTaskId, currentEditableTask });
    }

    checkHandler(id) {
        const tasks = [...this.state.tasks];
        const taskIndex = tasks.findIndex((task) => task.id === id)
        tasks[taskIndex].isChecked = !tasks[taskIndex].isChecked;
        this.setState({ tasks })
    }
    addToHistory(obj) {
        let {historyPointer} = this.state;
        const history = this.state.history.slice(0, historyPointer+1);
        historyPointer++;
        history.push(obj)
        this.setState({ history, historyPointer})
    }
    undoHandler() {
        const history = [...this.state.history];
        let {historyPointer} = this.state;
        if(historyPointer - 1 < 0) {
            return;
        }
        historyPointer--;
        const tasks = [...history[historyPointer].tasks];
        this.setState({ tasks, historyPointer });
    }
    redoHandler() {
        const history = [...this.state.history];
        let {historyPointer} = this.state;
        if(historyPointer + 2 > history.length) {
            return;
        }
        historyPointer++;
        const tasks = [...history[historyPointer].tasks];
        this.setState({ tasks, historyPointer });
    }
    render() { 
        const tasks = this.state.tasks;
        const allowEditing = this.state.allowEditing;
        const allowAddingTasks = this.state.allowAddingTasks;
        const allowUndo = this.state.historyPointer > 0;
        const allowRedo = this.state.historyPointer < this.state.history.length -1;
        return ( 
            <form className="NoteForm Utility__card" onSubmit={this.submitHandler.bind(this)}> 
                <div className="NoteForm__controls">
                    {allowUndo? <Undo clickHandler={this.undoHandler.bind(this)}/>: <div style={{width: "2.3rem"}}></div> }
                    {allowRedo? <Redo clickHandler={this.redoHandler.bind(this)}/>: ' ' }
                </div>
                
                <label className="NoteForm__field" onClick={() => this.setState({allowEditing: true})}>
                    Title:
                    {allowEditing?
                    <input autoFocus={allowEditing} className="NoteForm__field__input" form="none" onBlur={() => this.setState({allowEditing: false})} name="title" value={this.state.title} onChange={this.inputChangeHandler.bind(this)}/>
                    :<h3 className="NoteForm__title">{this.state.title}<img alt="edit" src="https://www.svgrepo.com/show/61278/edit.svg"/></h3>
                    }
                </label>
                <label className="NoteForm__field">
                    Tasks:
                    </label>
                    <div className="NoteForm__field">
                        <TaskContext.Provider 
                        value={{
                            taskId:this.state.currentEditableTaskId, 
                            taskValue: this.state.currentEditableTask, 
                            inputHandler: this.setCurrentEditableTask.bind(this),
                            updateTasksHandler: this.updateTasks.bind(this)
                        }}>
                             {tasks.length > 0? <TasksList tasks={tasks} deleteHandler={this.deleteHandler.bind(this)} checkHandler={this.checkHandler.bind(this)} editHandler={this.editTaskHandler.bind(this)}/>: null}
                        </TaskContext.Provider>
                    {allowAddingTasks?
                    <input autoFocus={!allowEditing} className="NoteForm__field__input" onBlur={() => this.setState({allowAddingTasks: false})}  onKeyDown={this.submitTaskHandler.bind(this)} name="task" form="none" value={this.state.task} onChange={this.inputChangeHandler.bind(this)}/>
                    : <button onClick={()=>this.setState({allowAddingTasks:true})} className="NoteForm__btn Utility__btn--alert">Add Task</button>}
                    </div>
                <input className="NoteForm__btn--right Utility__btn--success" type="submit" value="Save Changes"/>
            </form>
         );
    }
}
 
export default withRouter(NoteForm);