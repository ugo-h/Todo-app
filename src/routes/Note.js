import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import NoteForm from '../Containers/NoteForm/NoteForm';

function Note() {
    const match = useRouteMatch();
    return ( 
        <Switch>
            <Route path={`${match.url}/new/clear`}>
                <div className="Layout__main">
                    <Redirect to={`${match.url}/new`}/>
                </div>
            </Route>
            <Route path={`${match.url}/new`}>
                <div className="Layout__main">
                    <NoteForm type="create"/>
                </div>
            </Route>
            <Route path={`${match.url}/:id`}>
                <div className="Layout__main">
                    <NoteForm type="edit"/>
                </div>
            </Route>
        </Switch>
     );
}
 
export default Note;