import React from 'react';
import "./style.css"
import profile_thumbnail from './shutterstock_415922566.jpg'
import {checkIsAdmin, deleteUserAndProfile} from '../../actions/admin.js'



class ProfileCards extends React.Component {
  // the all the prop data will be connected through the server 

  state = {}
    
  componentDidMount() {
      checkIsAdmin(this)
      console.log(`CARD's state's isAdmin is ${this.state.isAdmin}`)

      this.state.profileId = this.props.profile_id
      console.log(`Checking this.state.profileId: ${this.state.profileId}`)
  }

  checkThumbailPic(galleryArray){
    if(galleryArray.length != 0){
      return <img className = "thumbnail"  alt = "" src = {galleryArray[0].image_url}/> 
    }else{
      return <img className = "thumbnail"  alt = "" src = {profile_thumbnail}/> 
    }
  }

  handleDeleteClick(profile_id) {
    console.log("HANDLE DELETE CLICK")
    return (profile_id) =>{
      alert(`Now deleting user ${this.state.profileId}`)
      deleteUserAndProfile(this.state.profileId)
    }
  }

  render() { 
        const {
            // hoverid,
            profileCardInfo,
            id,
            profile_id,
            handleHover, 
            handleUnHover,
            handleClick
        } = this.props 
        
        return (
         
          <div
            // hoverid = {hoverid}
            id={id}
            className="profileCard"
            profile_id={profile_id}
            onClick ={handleClick}
            onMouseEnter={handleHover}
            onMouseLeave={handleUnHover}
          >
            
            <div className="cardPic">
              {this.checkThumbailPic(profileCardInfo.gallery)}
            </div>
            <h3 className="cardName">{profileCardInfo.personalInfo.name}</h3>
            <br />
            <div className = "descDiv">
                <span className="profileDesc">
                  {profileCardInfo.personalInfo.description}
                </span>
            </div>
         
            <br />

            <span className="workTag">Work completed: {profileCardInfo.workDone}</span>
            <div className="deleteButton">
              {this.state.isAdmin ? <button onClick={this.handleDeleteClick(this.props.profile_id)}>DELETE USER</button> : null}
            </div>
          </div>
          
        );
    }
}
 
export default ProfileCards;
