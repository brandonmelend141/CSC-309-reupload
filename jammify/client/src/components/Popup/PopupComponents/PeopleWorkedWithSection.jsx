import React, { Component } from 'react';
// import ProfileCard from '../../ProfileCards';
// import {handleHover,handleUnHover} from "../../../actions/hover";
import PopupProfileCards from "../PopupProfileCards/popupProfile.js"
const profileData = require('../../../profileData.json')

class PeopleWorkedWithSection extends Component {

    render() {
        const collaborators = this.props.collaborators
        const showPopup = this.props.showPopup
        
        return(
            <div>
                {profileData.filter(p => collaborators.includes(p.profileId)).map(p => 
                // profile pictures, data etc will be retrieved from server instead of from local JSON
                        <PopupProfileCards
                            key={p.profileId}
                            id={p.profileId}
                            profile_id={p.profileId}
                            profilePic = {profileData[p.profileId-1].profilePic}
                            handleClick={showPopup}
                            profileCardInfo={profileData[p.profileId-1]}
                        />    
                    )
                }
            </div>
        )
    }
}
        
export default PeopleWorkedWithSection;
