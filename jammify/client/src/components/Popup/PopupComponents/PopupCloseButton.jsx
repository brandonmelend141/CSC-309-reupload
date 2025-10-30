import React, { Component } from 'react';
import closeButton from '../../../assets/img/close-o.svg'
class PopupCloseButton extends Component {
    
    render() {
        const closePopup=this.props.closePopup
        return(
            <div id="PopupCloseButton">
                
                <img className = "closeIcon" onClick ={closePopup} alt = '' src = {closeButton}/>
                {/* <button onClick={closePopup}></button> */}
            </div>
        )
    }
}

export default PopupCloseButton;