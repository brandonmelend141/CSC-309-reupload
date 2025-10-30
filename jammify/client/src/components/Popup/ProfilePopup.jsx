import React, { Component } from 'react';
import ProfileHeader from './PopupComponents/ProfileHeader';
import ProfileBody from './PopupComponents/ProfileBody';
import PopupCloseButton from './PopupComponents/PopupCloseButton';
import PopupFavoriteButton from './PopupComponents/PopupFavoriteButton';

import "./ProfilePopup.css";


// const profileInfo = {
//   profilePic: require('./kanye.jpg'),
//   personalInfo: {
//     description: "Visionary Artist, Genius, Rapper, Producer. #KANYE2020",
//     name: "Kanye West",
//     gender: "M",
//     age: "43"
//   },
//   works: {
//     albums: ["The College Dropout (2004)", "Late Registration (2005)", "Graduation (2006)"],
//     singles: ["Stronger", "FourFiveSeconds", "POWER"]
//   },
//   offering: ["Producer", "Rapper"],
//   lookingFor: ["Singer", "Guitarist"],
// }

// class ProfilePopup extends React.Component {
//     state = {  
//       popup_visible: false
//     };

//     togglePopup = () => {
//       console.log('clicked toggle popup')
//       this.setState({
//         popup_visible: !this.state.popup_visible
//       });
//     };

//     render() { 
//         return (
//           /* Place holder*/
//           <div className="ProfilePopupPage">
//             <div id="ProfileButton" onClick={this.togglePopup}>
//               <ProfilePicture picture={profileInfo.profilePic} />
//             </div>
//             {this.state.popup_visible ? <ProfilePopupBlock profileInfo={profileInfo} toggle={this.togglePopup} /> : null}
//           </div>
//         );
//     }
// }

class ProfilePopup extends Component {
  render() {
    const profileInfo = this.props.profileInfo
    // console.log(this.props.profileInfo)
    // const porfileID = this.props.profileID 
    const closePopup = this.props.closePopup
    const showPopup = this.props.showPopup
    // const profileInfo = profileInfoUnFilter.filter((p)=> p.profileId === porfileID)[0]
    // console.log(showPopup)
    return (
      <div className = "background">
        
        <div className="ProfilePopup">
          <PopupCloseButton closePopup={closePopup}/>
          <PopupFavoriteButton />
          <ProfileHeader profileInfo={profileInfo} />
          <ProfileBody profileInfo={profileInfo} showPopup={showPopup}/>
        </div>

      </div>
      
    );
  }
}

export default ProfilePopup;