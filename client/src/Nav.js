import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Nav extends Component {
  render(){
    const loggedIn = this.props.auth.isAuthenticated();
    const canWrite = this.props.auth.userHasScopes(["write:blog"])

    return (
      <nav className="header">
        {/* Left Side */}
        <div className="left-nav">
          <div className="title">
            <h1>Blog</h1>
          </div>
          <div className="nav-links">
            <Link to="/">Home&nbsp;</Link>
            {(loggedIn && canWrite) ? (<Link to="/edit">Write&nbsp;</Link> ): ("") }
            {(loggedIn) ? (<Link to="/profile" >Profile&nbsp;</Link>) : ("") }
          </div>
        </div>

        {/* Right Side */}
        <div className="login-control">
        {(!loggedIn) ? (
          <button onClick={this.props.auth.login}>Log In</button>
        ) : (
        <button onClick={this.props.auth.logout}>Log Off</button>
        )}
        </div>
      </nav>
    );
  }
}

export default Nav;
