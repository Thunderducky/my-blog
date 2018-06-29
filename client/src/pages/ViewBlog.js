import React, { Component } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

class ViewBlog extends Component {
  state = {
    blogs: [{
      id: 1,
      title: "This is a test",
      body: "Or is it????"
    }, {
      id: 2,
      title: "This is a test",
      body: "Or is it????"
    }]
  };

  refreshBlogs(){
    console.log("this should go!");
    axios.get("/api/blog").then( (res) => {
      console.log(res);
      this.setState({ blogs: res.data });
    });
  }

  componentDidMount(){
    this.refreshBlogs();
  }

  render(){
    return (
      <div>
        <Link to="/edit">New Blog Post</Link>
        { /* Map each of our posts */
          this.state.blogs.map( post => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <h3>Created at: {post.createdAt}</h3>
              <p>{ post.body}</p>
            </div>
          ))
        }
      </div>
    );''
  }
}

export default ViewBlog;
