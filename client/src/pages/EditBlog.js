import React from "react"
import { Link, withRouter } from "react-router-dom";
import axios from "axios"
import Auth from '../auth/Auth.js';

class EditBlog extends React.Component {
  state = {
    title: "",
    body: ""
  }
  handleInputChange = event => {
      const {name, value} = event.target;
      console.log(name);
      this.setState({ [name]: value});
  }
  postBlog = event => {
    event.preventDefault();
    const { getAccessToken } = this.props.auth;
    const headers = { 'authorization': `Bearer ${getAccessToken()}`}
    const { title, body} = this.state;
    axios.post("/api/blog", {title, body}, {crossDomain: true, withCredentials:true, headers}).then(res => {
      console.log(res);
      this.setState({ title: "", body: ""});
      this.props.history.push("/");
    })
  }
render(){
  return (
    <div>
      <Link to="/">Home</Link>
      <form>
        <input name="title" onChange={this.handleInputChange}  value={this.title} />
        <textarea name="body" onChange={this.handleInputChange} value={this.body} />
        <button onClick={this.postBlog}>Submit</button>
      </form>
    </div>
  );
}

}

export default withRouter(EditBlog);
