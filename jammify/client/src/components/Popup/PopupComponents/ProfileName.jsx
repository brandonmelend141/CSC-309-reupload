import React, { Component } from 'react';

class ProfileName extends Component {
  render() {
    const name = this.props.name;

    return(
      <div className="profileName">{name}</div>
    );
  }
}

export default ProfileName;