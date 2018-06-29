import React, { Component } from "react"
import { Link } from "react-router-dom";
class Profile extends Component {
  componentWillMount(){
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
     if (!userProfile) {
       getProfile((err, profile) => {
         this.setState({ profile });
         console.log(profile);
       });
     } else {
       this.setState({ profile: userProfile });
     }
     console.log(userProfile);
  }
  render(){
    const { profile } = this.state;
    return (
      <div>
        <Link to="/">Home</Link>
        <div>
          <img src={profile.picture}/><span>{profile.name}</span>
        </div>
      </div>
    )
  }
}

export default Profile;
