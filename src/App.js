import React from 'react';
import './App.css';
import {   BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import Note from './routes/Note/Note';

const portal = document.createElement('div');
portal.id="portal"
document.body.appendChild(portal)

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Switch>
          <Route path="/note">
            <Note/>
          </Route>
          
          <Route path="/">
             <Home/>
          </Route>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
