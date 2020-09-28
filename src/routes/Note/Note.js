import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import NoteForm from '../../Containers/NoteForm/NoteForm';

function Note(props) {
    const match = useRouteMatch();
    return ( 
        <Switch>
            <Route path={`${match.url}/new`}>
                <NoteForm/>
            </Route>
        </Switch>
     );
}
 
export default Note;