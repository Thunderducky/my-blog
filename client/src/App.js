import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    title: "",
    body: ""
  }
  getGetRequest(){
    axios.get("/api/test").then(res => {
      console.log("get test");
    });
  }
  getPostRequest(){
    axios.post("/api/test", {test: true}).then(res => {
      console.log("post test");
    });
  }
  handleInputChange = event => {
      const {name, value} = event.target;
      this.setState({ [name]: value});
  }
  saveBlog = event =>{
    event.preventDefault();
    console.log(this.state.title);
    console.log(this.state.body);
  }
  render() {
    return (
      <div>
        <form>
          <input name="title" onChange={this.handleInputChange}  value={this.state.title} />
          <textarea name="body" onChange={this.handleInputChange} value={this.state.body} />
          <button onClick={this.saveBlog}>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
