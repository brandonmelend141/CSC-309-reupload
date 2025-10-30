import React, { Component } from 'react';

import ProfileBodySubsection from './ProfileBodySubsection';
import ContactInfoSection from './ContactInfoSection';
import OfferingSection from './OfferingSection';
import LookingForSection from './LookingForSection';
import PersonalInfoSection from './PersonalInfoSection';
import PreviousWorksSection from './PreviousWorksSection';
import PeopleWorkedWithSection from './PeopleWorkedWithSection';
import GallerySection from './GallerySection';
import ProfilePicture from './ProfilePicture';

class ProfileBody extends Component {
  render() {
    const profileInfo = this.props.profileInfo;
    const showPopup = this.props.showPopup;
   
    // const profilePic = require('../../../assets/img/' + profileInfo.profilePic)
    // photos are stored/retrieved locally here but they'll be retrieved from server for phase 2
    // console.log(profileInfo)
    return(
      <div id="profileBody">
        <ProfileBodySubsection sectionHeader={"Contact Info"}
                               sectionInterior={<ContactInfoSection contactInfo={profileInfo.contactInfo} />} />
        <ProfileBodySubsection sectionHeader={"Offering"}
                               sectionInterior={<OfferingSection offering={profileInfo.offering} /> } />
        <ProfileBodySubsection sectionHeader={"Looking For"}
                               sectionInterior={<LookingForSection lookingFor={profileInfo.lookingFor} /> } />
        <ProfileBodySubsection sectionHeader={"Personal Info"}
                               sectionInterior={<PersonalInfoSection personalInfo={profileInfo.personalInfo} /> }/>
        <ProfileBodySubsection sectionHeader={"Gallery"}
                               sectionInterior={<GallerySection galleryPictures={profileInfo.gallery} />} />
        <ProfileBodySubsection sectionHeader={"Works"}
                               sectionInterior={<PreviousWorksSection works={profileInfo.works} />} />
        {/* <ProfileBodySubsection sectionHeader={"Worked With"}
                               sectionInterior={<PeopleWorkedWithSection collaborators={profileInfo.collaborators} showPopup={showPopup}/>} /> */}
      </div>
    );
  }
}

export default ProfileBody;
