import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Chat from './containers/Chat/Chat';
import Login from './containers/Login/Login';
import classes from './App.css';


// const data = [
//     {text : 'asd',
//     user : 'clamuss', 
//     time : '21:23'},
//     {text : 'zxcsdaskdmnasjkndjas dkmas djasndjkasdkasnd asjd',
//       user : user,
//       time : '21:24'}
//   ]

class App extends Component { 
  render() {
    return (
      <BrowserRouter>
        <div className = {classes.App}>
          <Layout>
              <Switch>
                <Route 
                  path="/login" 
                  component={Login}
                />
                <Route 
                  path="/" 
                  exact 
                  component={Chat}
                />
              </Switch>
          </Layout>  
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
