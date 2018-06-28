import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    title: "",
    body: ""
  }
  handleInputChange = event => {

      const {name, value} = event.target;
      console.log(name);
      this.setState({ [name]: value});
  }
  saveBlog = event =>{
    event.preventDefault();
    console.log(this.state.title);
    console.log(this.state.body);
  }
  postBlog = event => {
    event.preventDefault();
    const { title, body} = this.state;
    axios.post("/api/blog", {title, body}).then(res => {
      console.log(res);
      this.setState({ title: "", body: ""});
    })
  }
  render() {
    return (
      <div>
        <form>
          <input name="title" onChange={this.handleInputChange}  value={this.state.title} />
          <textarea name="body" onChange={this.handleInputChange} value={this.state.body} />
          <button onClick={this.postBlog}>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
