import React from 'react';
import "././style.css"

class PopupProfileCards extends React.Component {
    state = {  }
    
    render() { 
        //this component is for the popup profile worked with tab, it will grab the data from the server 
        const {
            // hoverid,
            profileCardInfo,
            profilePic,
            id,
            profile_id,
            handleClick
        } = this.props
        return (  
            <div
                id = {id} 
                className = "popupProfile"
                profile_id={profile_id}
                onClick ={handleClick}
            >
                <div className="popupPfp">
                    <img className = "popupProfilePic"  alt = "" src = {require('../../../assets/img/' + profilePic)}/> 
                </div>
                <h3 className="popupProfileName">{profileCardInfo.personalInfo.name}</h3>
            </div>
        );
    }
}
 
export default PopupProfileCards;