import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NoteForm from '../../Containers/NoteForm/NoteForm';

function Note(props) {
    const match = useRouteMatch();
    return ( 
        <Switch>
            <Route path={`${match.url}/new`}>
                <div className="Layout__main">
                    <NoteForm/>
                </div>
            </Route>
            <Route path={`${match.url}/:id`}>
                <div className="Layout__main">
                    <NoteForm/>
                </div>
            </Route>
        </Switch>
     );
}
 
export default Note;