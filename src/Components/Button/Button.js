import React, { Component } from 'react';
import './Button.css';

const SIZES = {
    'sm':'--sm',
    'small': '--sm'
}

class Button extends Component {
    constructor(props) {
        super(props);
        this.type = "delete";
        this.url ="https://www.svgrepo.com/show/243868/delete.svg";
        this.size = SIZES[props.size] || '';
    }
    
    render() {
        let {clickHandler} = this.props
        return(
            <button className={`Button-icon${this.size}`} onClick={ clickHandler } form="none">
                <img alt={this.type} src={this.url}/>
            </button>
        )
    }
}
export class Delete extends Button {

}
export class Edit extends Button {
    constructor(props) {
        super(props);
        this.type = "edit";
        this.url ="https://www.svgrepo.com/show/61278/edit.svg";
    }
}
export class Undo extends Button {
    constructor(props) {
        super(props);
        this.type="undo";
        this.url ="https://www.svgrepo.com/show/278483/undo.svg"
    }
}
export class Redo extends Button {
    constructor(props) {
        super(props);
        this.type="redo";
        this.url ="https://www.svgrepo.com/show/278479/redo.svg"
    }
}
export class CheckMark extends Button {
    constructor(props) {
        super(props);
        this.type="checkmark";
        this.url = "https://www.svgrepo.com/show/225864/check-success.svg";
    }
}

