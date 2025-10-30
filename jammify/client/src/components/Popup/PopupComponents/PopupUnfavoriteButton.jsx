import React, { Component } from 'react';
import $ from "jquery"

class PopupUnFavoriteButton extends Component {

    favoriteProfile(e){
        $(".favoriteButton").addClass("focused")
    }
    render () {
        return(
            <div id='PopupFavoriteButton'>
                <button onClick = {this.favoriteProfile} className="favoriteButton">Unfavorite!</button>
            </div>
        )
    }
}

export default PopupUnFavoriteButton;