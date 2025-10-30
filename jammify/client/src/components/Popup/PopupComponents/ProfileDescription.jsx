import React, { Component } from 'react';

class ProfileDescription extends Component {
  render () {
    const description = this.props.description
    
    return(
      <div id="profileDescription">
        <p>{description}</p>
      </div>
    );
  }
}

export default ProfileDescription;