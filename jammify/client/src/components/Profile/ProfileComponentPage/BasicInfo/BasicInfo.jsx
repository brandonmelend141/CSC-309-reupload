import React, { Component } from "react";
import Popup from "./UserPopup";
import "./BasicInfo.css";

class BasicInfo extends Component {
  constructor() {
    super();
    this.state = { showPopup: false };
  }
  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  render() {
    const { work, email, gallery } = this.props.user;
    return (
      <div>
        <div className="profileInfo">
          <p className="profileItem"> Work: {work} </p>
          <p className="profileItem ">Email: {email}</p>
          <p className="profileItem"> Gallery: {gallery}</p>
          <button
            className="editProfile"
            onClick={() => {
              this.togglePopup();
            }}
          >
            Edit Profile
          </button>
        </div>

        <div className="profilePopup">
          {this.state.showPopup ? (
            <Popup
              userInfo={this.props.user}
              closePopup={() => {
                this.togglePopup();
              }}
              handleOnSave={this.props.handleOnSave}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default BasicInfo;
