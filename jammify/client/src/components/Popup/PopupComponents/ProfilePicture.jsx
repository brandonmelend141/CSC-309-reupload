import React, { Component } from 'react';

class ProfilePicture extends Component {
  render() {
    const pic = this.props.picture
    // photos are stored/retrieved locally here but they'll be retrieved from server for phase 2
    const name = this.props.name

    console.log("rendering profile pic")
    
    return (
      <img id="ProfilePicture" src={pic} alt={name}></img>
    );
  }
}

export default ProfilePicture;