import React, { Component } from 'react';

import ProfilePicture from './ProfilePicture';
import ProfileName from './ProfileName';
import ProfileDescription from './ProfileDescription';

class ProfileHeader extends Component {
  render() {
    const profileInfo = this.props.profileInfo;
    const profilePicInfo = this.props.profileInfo.profilePic[0]
  

    return(
      <div id="profileHeader">
        <ProfilePicture picture={profilePicInfo.image_url} name={profileInfo.personalInfo.name}/>
        <ProfileName name={profileInfo.personalInfo.name}/>
        <ProfileDescription description={profileInfo.personalInfo.description}/>
      </div>
    );
  }
}

export default ProfileHeader;