import React, { Component } from "react";
import "./Friends.css";
import { Tab } from "../../../Common/Tab/Tab";
import { Tabs } from "../../../Common/Tab/Tabs";
import FavProfilePopup from "../../../Popup/FavProfile";
const profileData = require('../../../../profileData.json')
class Favourites extends Component {
  state = {};
  render() {
      return (
              <div className="favourite">
                <Tabs tabClassName="tabColNav">
                  <Tab label = "Kanye Omari West" 
                  tabStyle = "picTab" 
                  innerHtml = "<button >Unfavorite</button>"
                  innerCSS = "unfollow">
                <div className="favPopup">
                    <FavProfilePopup 
                      profileInfo={
                        profileData.filter(
                          (p) => p.profileId == 1)[0]
                      }
                      showPopup={this.showPopup}
                    />
                    </div>
                  </Tab>
                  <Tab label = "Taylor Swift"
                   tabStyle = "picTab" 
                   innerHtml = "<button >Unfavorite</button>"
                   innerCSS = "unfollow">
                  <FavProfilePopup 
                      profileInfo={
                        profileData.filter(
                          (p) => p.profileId == 2)[0]
                      }
                      showPopup={this.showPopup}
                    />
                  </Tab>
                  <Tab label = "Kendrick Lamar"
                   tabStyle = "picTab" 
                   innerHtml = "<button >Unfavorite</button>"
                   innerCSS = "unfollow">
                  <FavProfilePopup 
                      profileInfo={
                        profileData.filter(
                          (p) => p.profileId == 3)[0]
                      }
                      showPopup={this.showPopup}
                    />
                  </Tab>
                  
                </Tabs>
              </div>
    );
  }
}

export default Favourites;
