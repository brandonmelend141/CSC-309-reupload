import React, { Component } from 'react';
import $ from "jquery"

class PopupFavoriteButton extends Component {
    //for now this function only shows an animation however it will link to the server once that is running 
    favoriteProfile(e){
        $(".favoriteButton").addClass("focused")
    }
    render () {
        return(
            <div id='PopupFavoriteButton'>
                <button onClick = {this.favoriteProfile} className="favoriteButton">Favorite!</button>
            </div>
        )
    }
}

export default PopupFavoriteButton;