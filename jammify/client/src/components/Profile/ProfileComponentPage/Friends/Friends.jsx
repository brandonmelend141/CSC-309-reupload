import React, { Component } from "react";
import { friendsReq } from "./FriendsData";
import "./Friends.css";
class Friends extends Component {
  state = {};
  render() {
    return (
      <div className="friends">
        <div className="scroller">
          {friendsReq.map((user) => {
            const{ username, profileImage, description } = user;
            console.log(user);
            return (
              <div className="request">
                <img className="friendImg" src={require(`${profileImage}`)} />
                <div className="name">{username}</div>
                <div className="friendDesc">{description}</div>
                <button 
                // onClick={()=>{friendsReq.pop(user)}}
                >
                  Unfollow
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Friends;

{this.state.popup_visible ? <ProfilePopup profileInfo={profileData.filter(p => p.profileId == this.state.popup_view_id)[0]} 
// in phase2, we'll make a call to the server to retrieve profile data
// instead of getting it from our JSON file here
closePopup={this.closePopup} 
showPopup={this.showPopup}/> : null}
