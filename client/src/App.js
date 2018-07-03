import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import Auth from "./auth/Auth.js"
import './App.css';

import { Router, Route, Redirect } from "react-router-dom";
import history from "./history"

import Nav from './Nav';
import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';
import Callback from './pages/Callback';
import Profile from './pages/Profile';
const auth = new Auth();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <div>
            <Nav auth={auth} />
          </div>
          <Route exact path="/" render={
            (props) => {
              return (<ViewBlog auth={auth} {...props}/>);
            }
          }/>
          <Route exact path="/edit" render={
            (props) => {
              return (auth.isAuthenticated() && auth.userHasScopes(["write:blog"])) ? (
                <EditBlog auth={auth} {...props}/>
              ) : (
                <Redirect to="/"/>
              )
            }
          }/>
          <Route exact path="/profile" render={
            (props) => {
              return (auth.isAuthenticated()) ? (
                <Profile auth={auth} {...props}/>
              ) : (
                <Redirect to="/"/>
              )

            }
          }/>
          <Route path="/callback" render={
            (props) => {
              auth.handleAuthentication(props);
              return <Callback {...props} />
            }
          }/>
        </div>
      </Router>

    );
  }
}

export default App;
