import React from 'react';
import './App.css';
import {   BrowserRouter, Switch, Route } from 'react-router-dom';
import NotesList from './Containers/NotesList/NotesList';
import Note from './routes/Note';
import Header from './Components/Header/Header';

const portal = document.createElement('div');
portal.id="portal"
document.body.appendChild(portal)

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header/>
        
        <Switch>
          <Route path="/note">
            <Note/>
          </Route>
          
          <Route path="/">
            <div className="Layout__main"> 
              <NotesList/>
            </div>
          </Route>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
