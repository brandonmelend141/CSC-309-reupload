import React, { Component } from "react";
import "./profile.css";
import Header from "./../../Common/Header";
import settingButton from '../../../assets/img/settings.svg'
import $ from "jquery"
import { loadOneProfile } from "../../../actions/profiles";
import { getUserProfileId } from "../../../actions/profiles";
import { updateProfileData } from "../../../actions/profiles";
import { addImage } from "../../../actions/images";
import { addShowCaseImage } from "../../../actions/images";
// import PopupProfileCards from "../PopupProfileCards/popupProfile.js"
// import Favourites from "../ProfileComponentPage/Friends/Favourites";
// import Interests from "../ProfileComponentPage/Interests/Interests";
// import BasicInfo from "../ProfileComponentPage/BasicInfo/BasicInfo";
// import { Tab } from "../../Common/Tab/Tab";
// import { Tabs } from "../../Common/Tab/Tabs";

class Profile extends Component {

  constructor(props) {
    super(props);
    // this.state.user =  JSON.parse(window.localStorage.data);
  }

  
  state = {
    profileId:null,
    profilePageInfo: [],
    showCasePics: [],
    profilePic:[],
    personalInfo:[],
    workInfo:[],
    contactInfo:[]
  };
  componentDidMount() {
    getUserProfileId(this)
  }


  // handleChange = (event, newValue) => {
  //   this.setState({
  //     [this.state.value]: newValue,
  //   });
  // };
  // handleOnSave = (userUpdate) => {
  //   let newUser = { ...this.state.user };
  //   Object.assign(newUser, userUpdate);
  //   this.setState({
  //     user: newUser,
  //   });
  // };
  uploadPic = (e) =>{
    // e.preventDefault();
    $('#getFile').trigger('click');
    console.log($('#getFile').prop('files'))
  
  }
  uploadShowCasePic = (e) =>{
    // e.preventDefault();
    $('#getShowCaseFile').trigger('click');
    
    console.log($('#getShowCaseFile').prop('files'))
  
  }

  
  editContent = (e) =>{
    $(".saveButton").addClass("activeSave")
    document.querySelector(".profileCardName").contentEditable = "true"
    document.querySelector(".profileCardGender").contentEditable = "true"
    document.querySelector(".profileCardAge").contentEditable = "true"
    document.querySelector(".profileBio").contentEditable = "true"
    document.querySelector(".profileOffering").contentEditable = "true"
    document.querySelector(".profileLookingFor").contentEditable = "true"
    document.querySelector(".profilePWAlbums").contentEditable = "true"
    document.querySelector(".profilePWSingles").contentEditable = "true"
    document.querySelector(".profileContentInfoNumber").contentEditable = "true"
    document.querySelector(".profileContentInfoEmail").contentEditable = "true"
    // document.querySelector(".profileCardName")

  }
  
  saveEdits = (e) =>{
    $(".saveButton").removeClass("activeSave")
    document.querySelector(".profileCardName").contentEditable = "false"
    document.querySelector(".profileCardGender").contentEditable = "false"
    document.querySelector(".profileCardAge").contentEditable = "false"
    document.querySelector(".profileBio").contentEditable = "false"
    document.querySelector(".profileOffering").contentEditable = "false"
    document.querySelector(".profileLookingFor").contentEditable = "false"
    document.querySelector(".profilePWAlbums").contentEditable = "false"
    document.querySelector(".profilePWSingles").contentEditable = "false"
    document.querySelector(".profileContentInfoNumber").contentEditable = "false"
    document.querySelector(".profileContentInfoEmail").contentEditable = "false"

    this.state.personalInfo.name = document.querySelector(".profileCardName").innerText
    this.state.personalInfo.age = document.querySelector(".profileCardAge").innerText
    this.state.personalInfo.gender = document.querySelector(".profileCardGender").innerText
    this.state.personalInfo.description = document.querySelector(".profileBio").innerText

    this.state.workInfo.albums = document.querySelector(".profilePWAlbums").innerText
    this.state.workInfo.singles = document.querySelector(".profilePWSingles").innerText

    this.state.contactInfo.phone = document.querySelector(".profileContentInfoNumber").innerHTML
    this.state.contactInfo.email = document.querySelector(".profileContentInfoEmail").innerHTML

    this.state.profilePageInfo.personalInfo = this.state.personalInfo
    this.state.profilePageInfo.contactInfo = this.state.contactInfo
    this.state.profilePageInfo.works = this.state.workInfo
    this.state.profilePageInfo.offering =  document.querySelector(".profileOffering").innerHTML
    this.state.profilePageInfo.lookingFor =  document.querySelector(".profileLookingFor").innerHTML
    console.log(this.state.profilePageInfo)
    updateProfileData(this.state.profileId.profileId,this)
    // this.setState({
    //   profilePageInfo: [],
    //   personalInfo:[],
    //   workInfo:[],
    //   contactInfo:[]
    // })
    
  }

  
  render() {
    if (!this.state.profileId) {
      return <div />
    }
    if(this.state.profilePageInfo.length === 0){
      console.log(this.state.profileId.profileId)
      loadOneProfile(this.state.profileId.profileId,this)
    }

    // $('body').on('change', '#getFile', function($){
    //   // console.log(t/his.state.profileId.profileId)
    //   const file = this.files[0]
    //   this.saveProfilePic(file)
    //   console.log(file)
    // });

    // $('body').on('change', '#getShowCaseFile', function($){
    //   // console.log(this.state)
    //   const file = this.files[0]
    //   this.saveShowCase(file)
    //   console.log(file)
    // });
    
  //   inputElement.onchange = function(event) {
  //     var fileList = event.target.files;
  //     //TODO do something with fileList.  
  //  }
   

    return (
     
      <div className="profilePageWrapper">
       
        <Header />
        
        <div className = "profilePageCardContainer">
          <div className = "favoriteProfiles">
              <p className = "favs">Favorite Accounts</p>
          </div>

          <div className ="profilePageCard">
            <div className = "settings" onClick = {this.editContent}>
              <img className = "settingsIcon"   alt = '' src = {settingButton}/>
            </div>
            <button onClick = {this.saveEdits} className = "saveButton">Save Edits</button>

            <div className = 'profilePagePicHolder' onClick = {this.uploadPic}>
              <input style={{display:'none'}} type="file" id="getFile" onChange = {(e)=> addImage(e.target.files[0],this.state.profileId.profileId)} />
              <img id = "profilePagePic" src={this.state.profilePic.image_url} alt="male profile img" ></img>
            </div>

            <div className = "idInfo">
              <p className = "profileCardName" contentEditable = 'false'>{this.state.personalInfo.name}</p>
              <p className = "profileCardGender" contentEditable = 'false'>{this.state.personalInfo.gender}</p>
              <p className = "profileCardAge" contentEditable = 'false'>{this.state.personalInfo.age}</p>
            </div>

            <div className = "profileCardDesc">
              <div className = "profileCardDescHeader">
                  Biography 
              </div>
              <div className = "profileCardDescContent">
                <p contentEditable = 'false' className = "profileBio">{this.state.personalInfo.description}</p>
              </div>
            </div>

            <div className = "profileCardContactInfo">
              <div className = "profileCardContactInfoHeader">
                  Contact Info 
              </div>
              <div className = "profileCardContactInfoContent">
                 <p className = "profilePhoneInfo">Phone:</p><span contentEditable = 'false' className = "profileContentInfoNumber"> {this.state.contactInfo.phone}</span>
                 <p className = "profileEmailInfo">Email:</p><span contentEditable = 'false' className = "profileContentInfoEmail"> {this.state.contactInfo.email}</span>
              </div>
            </div>
            
            <div className = "profileCardOffering">
              <div className = "profileCardOfferingHeader">
                  Offering services 
              </div>
              <div className = "profileCardOfferingContent">
                <p contentEditable = 'false' className = "profileOffering">{this.state.profilePageInfo.offering}</p>
              </div>
            </div>
            
            <div className = "profileCardLookingFor">
              <div className = "profileCardLookingForHeader">
                  Looking for services 
              </div>
              <div className = "profileCardLookingForContent">
                <p contentEditable = 'false' className = "profileLookingFor">{this.state.profilePageInfo.lookingFor}</p>
              </div>
            </div>

            <div className = "profileCardShowCase">
              <div className = "profileCardShowCaseHeader">
                  Showcase
              </div>
              <div className = "profileCardShowCaseContent" onClick = {this.uploadShowCasePic}>
                {/* <form>

                </form> */}
                <input style={{display:'none'}} type="file"  id="getShowCaseFile" onChange = {(e)=> addShowCaseImage(e.target.files[0],this.state.profileId.profileId)} />
                {/* {console.log(this.state.showCasePics.length)} */}
                {this.state.showCasePics != undefined && <img id = "profilePageShowCasePic" src={this.state.showCasePics.image_url} alt = "SCPic"></img>}
                
                {/* <p contentEditable = 'false' className = "profileShowCaseInfo"></p> */}
              </div>
            </div>

            <div className = "profileCardPerviousWork">
              <div className = "profileCardPerviousWorkHeader">
                  Pervious Work
              </div>
              <div className = "profileCardPerviousWorkContent">
                <p className = "profilePageAlbums">Albums: </p><span contentEditable = 'false' className = "profilePWAlbums"> {this.state.workInfo.albums}</span>
                <p className = "profilePageSingles">Singles: </p><p contentEditable = 'false' className = "profilePWSingles">  {this.state.workInfo.singles}</p>
              </div>
            </div>
          </div>

        </div>
        
  
      </div>
      
    );
  }

  
}
// {/* <div className="profile">
//           <div className="profileContainer">
//             <div className="profileContent">
//               <Tabs tabClassName= "tabRowNav">
//                 <Tab label="About Me" tabStyle = "regTab">
//                   <div className="profileHeading">
//                     <div className="profilePic">{profileImage}</div>
//                     <p className="profileName ">
//                       {firstName + "      " + lastName}
//                     </p>
//                     <p className="profileDesc"> {description}</p>
//                   </div>
//                   <BasicInfo
//                     user={this.state.user}
//                     handleOnSave={this.handleOnSave}
//                   />
//                 </Tab>
//                 <Tab label="Favourites" tabStyle = "regTab">
//                   <Favourites />
//                 </Tab>
//               </Tabs>
//             </div>
//           </div>
//         </div> */}

export default Profile;
