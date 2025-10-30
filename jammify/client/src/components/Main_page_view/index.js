import React from 'react';
import "./style.css"
// import default_pfp from './default_pfp.png'

import Header from "./../Common/Header"
import FilterBar from './../Common/FilterBar'
import ProfileCard from './../ProfileCards'

import {handleHover,handleUnHover} from "../../actions/hover";
import {loadProfiles} from "../../actions/profiles.js";
import {checkIsAdmin} from "../../actions/admin.js";
import ProfilePopup from ".././Popup/ProfilePopup";


// const profileData = require('../../profileData.json')
// here we've used a JSON file to store our profile data, this will eventually be stored on database

class MainPage extends React.Component {

    state = {  
        popup_visible: false,
        profile_view_id: 1,
        profileData:[],
        currentProfileData:[]
      };

    togglePopup = () => {
      console.log('clicked toggle popup')
      this.setState({
        popup_visible: !this.state.popup_visible
      });
    };

    closePopup = () => {
      document.body.classList.remove("freeze_scroll")
      this.setState({
        popup_visible: false
      })
    }
    // updateData = () =>{
    //      this.state.profileData.filter((p)=> p.profileId === this.state.profile_view_id)[0]
    // }
    showPopup = (e) => {
      document.body.classList.add("freeze_scroll")

      console.log('SHOWING POPUP')
      console.log(e)
      console.log(e.target.nodeName)
      if(e.target.nodeName === 'BUTTON') {
        console.log("DETECTED THIS IS A BUTTON")
        return
      } else {

      console.log(e.currentTarget)

      const new_profile_view_id = e.currentTarget.getAttribute('profile_id')
      const new_current_data = this.state.profileData.filter( (p) => p.profileId == new_profile_view_id)[0]
      console.log(`New profile view id: ${new_profile_view_id}`)
      // console.log(`New current data: ${JSON.stringify(new_current_data)}`)

      this.setState({
        profile_view_id: new_profile_view_id, // modulo 3 so we just cycle beween the three profiles we have
        popup_visible: true,
        currentProfileData: new_current_data
      })
    }
      // console.log(this.state.profileData)
      // console.log(this.state.currentProfileData)
      // this.state.currentProfileData = 
      // console.log(this.state.currentProfileData)
      // console.log(this.state.profileData.filter((p)=> p.profileId === this.state.profile_view_id)[0])
    }

    componentDidMount()
    {
      // if(this.state.profileData.length ==0){
      loadProfiles(this)
      checkIsAdmin(this)

      console.log(`Component state's isAdmin is ${this.state.isAdmin}`)
    }
   
    render() { 

      console.log("LOGGING THIS.STATE.PROFILEDATA")
      console.log(this.state.profileData)

      const {app}=this.props;
      let profileArray = []
      // placeholder function load cards, this will be changed to connect to the server and load
        const add_profiles = ()=>{
          // let profileData = []
          // if(this.state.profileData.length ==0){
          //   loadProfiles(this)
          //   checkIsAdmin(this)

          //   console.log(`Component state's isAdmin is ${this.state.isAdmin}`)
          // }
                for(let i = 0; i< this.state.profileData.length;i++){
                  profileArray.push(
                    <ProfileCard 
                      key={i} 
                      id ={this.state.profileData[i].profileId} 
                      profile_id={this.state.profileData[i].profileId} // modulo is here to rotate between same 3 profiles
                      profileCardInfo={this.state.profileData[i]} // again, the modulo is to rotate between the same 3 profiles 
                      handleClick={this.showPopup}  
                      handleHover={(e)=>handleHover(e,true)} 
                      handleUnHover={(e)=>handleUnHover(e,false)}
                    />) 
                }
            return profileArray    
        }

        add_profiles()

        return ( 
            
            <div className = "mainPage">
                <Header app={app}/>
                <FilterBar/>
                <div id="cardContainer">
                    {profileArray}    
                </div>
             
                {this.state.popup_visible ? <ProfilePopup profileInfo={this.state.currentProfileData}
                                                          
                                                          // in phase2, we'll make a call to the server to retrieve profile data
                                                          // instead of getting it from our JSON file here
                                                          closePopup={this.closePopup} 
                                                          showPopup={this.showPopup}/> : null}
                {/* citing my sources: https://stackoverflow.com/questions/24502898/show-or-hide-element-in-react */}
            </div>
            
        );
    }
}
    
export default MainPage
