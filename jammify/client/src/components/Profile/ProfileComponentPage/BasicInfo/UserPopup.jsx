import Input from "../../../Common/Input";
import React from "react";
import "./userPopup.css";
import { nameValidation, emailValidation, descValidation } from "./Validation";

class DisplayError extends React.Component {
  constructor(props) {
    super();
  }
  state = {};
  render() {
    let errorMessage = "";
    if (this.props.validated) {
      if (this.props.errors.length === 0) {
        errorMessage = "Successfully updated!!!";
      } else {
        errorMessage = this.props.errors.reduce((errorMessage, err) => {
          return errorMessage.concat(err);
        }, "");
      }
    } else {
      errorMessage = "Please change your basic information here!";
    }
    return <h1 className="errorMessages">{errorMessage}</h1>;
  }
}
class UserPopup extends React.Component {
  constructor(props) {
    super();
    this.inputBuffer = {...props.userInfo};
    this.valid = false;
    this.state.error = [];
    this.check = false;
  }
  state = {};
  inputBuffer = {}
  check = false;
  valid = false;


  validation(validationChecker, fieldName, fieldValue, errorArray) {
    let msg = validationChecker(fieldName, fieldValue);
    if ("Valid" !== msg) {
      this.setState({valid: false});
      errorArray.push(msg);
    }
  }

  handleValidOnSave = () => {
    this.check = true;
    let errorArray = [];
    this.validation(nameValidation, "First Name", this.inputBuffer.firstName, errorArray);
    this.validation(nameValidation, "Last Name", this.inputBuffer.lastName, errorArray);
    this.validation(emailValidation, "Email", this.inputBuffer.email, errorArray);
    this.validation(descValidation, "Validation", this.inputBuffer.description, errorArray);
    console.log(errorArray)
    if (errorArray.length === 0) {
      this.valid = true;
    }
    if (this.valid) {
      this.props.handleOnSave(this.inputBuffer);
      console.log(this.props.handleOnSave)
    } 
    this.setState({
      error: errorArray,
    });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      gender,
      description,
      gallery,
      work,
    } = this.props.userInfo;

    return (
      <div className="popupEdit">
        <div className="popup-content">
          <div className="popTitle">Edit User Profile</div>

          <DisplayError
            errors={this.state.error}
            validated={this.check}
          />

          <div className="popForm">
            <div className="popItem">
              <div className="popField">FirstName:</div>
              <div className="popValue">
                <Input
                  name="firstName"
                  label="firstName"
                  value={firstName}
                  onChange={(event) => {this.inputBuffer.firstName = event.target.value;}}
                />
              </div>
            </div>

            <div className="popItem">
              <div className="popField">LastName:</div>
              <div className="popValue">
                <Input
                  name="lastName"
                  label="lastName"
                  value={lastName}
                  onChange={(event) => {this.inputBuffer.lastName = event.target.value;}}
                />
              </div>
            </div>

            <div className="popItem">
              <div className="popField">Email Address:</div>
              <div className="popValue">
                <Input
                  name="email"
                  label="email"
                  value={email}
                  onChange={(event) => {this.inputBuffer.email = event.target.value;}}
                />
              </div>
              <div className="popField">Gender:</div>
              <div className="popValue">
                <Input
                  name="gender"
                  label="gender"
                  value={gender}
                  onChange={(event) => {this.inputBuffer.gender = event.target.value;}}
                />
              </div>
            </div>

            <div className="popItem">
              <div className="popField">Desciption about yourself:</div>
              <div className="popValue">
                <Input
                  name="description"
                  label="description"
                  value={description}
                  onChange={(event) => {this.inputBuffer.description = event.target.value;}}
                />
              </div>
            </div>

            <div className="popItem">
              <div className="popField">Gallery</div>
              <div className="popValue">
                <Input
                  name="gallery"
                  label="gallery"
                  value={gallery}
                  onChange={(event) => {this.inputBuffer.gallery = event.target.value;}}
                />
              </div>
            </div>

            <div className="popItem">
              <div className="popField">Previous Work</div>
              <div className="popValue">
                <Input
                  name="work"
                  label="work"
                  value={work}
                  onChange={(event) => {this.inputBuffer.work = event.target.value;}}
                />
              </div>
            </div>
          </div>
          <div className="exitButtons">
            <button
              className="save"
              onClick={() => {
                this.handleValidOnSave();
              }}
            >
              SAVE
            </button>
            <button
              className="saveExit"
              onClick={() => {
                this.handleValidOnSave();
                this.props.closePopup();
              }}
            >
              SAVE AND QUIT
            </button>
            <button className="quit" onClick={this.props.closePopup}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPopup;
