import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';

class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ViewBlog} />
          <Route path="/edit" component={EditBlog} />
          {/* <EditBlog
            handleInputChange={this.handleInputChange}
            title={this.state.title}
            body={this.state.body}
            postBlog={this.postBlog}
          /> */}
        </div>
      </Router>

    );
  }
}

export default App;
