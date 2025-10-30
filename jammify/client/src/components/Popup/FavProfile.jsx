import React, { Component } from 'react';
import ProfileHeader from './PopupComponents/ProfileHeader';
import ProfileBody from './PopupComponents/ProfileBody';
import PopupUnFavoriteButton from './PopupComponents/PopupFavoriteButton';
import "./FavProfile.css";


class FavProfilePopup extends Component {
  render() {
    const profileInfo = this.props.profileInfo
    const showPopup = this.props.showPopup

    return (
      
        
        <div className="ProfilePopup">
          <PopupUnFavoriteButton />
          <ProfileHeader profileInfo={profileInfo} />
          <ProfileBody profileInfo={profileInfo} showPopup={showPopup}/>
        </div>

    
      
    );
  }
}

export default FavProfilePopup;