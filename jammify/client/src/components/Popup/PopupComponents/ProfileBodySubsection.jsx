import React, { Component } from 'react';

class ProfileBodySubsection extends Component {
  render() {
    const sectionHeader = this.props.sectionHeader
    const sectionInterior = this.props.sectionInterior

    return(
      <div className="profileBodySubsection">
        <p className="sectionHeader">{sectionHeader}</p>
        {sectionInterior}
      </div>
    );
  }
}

export default ProfileBodySubsection;
