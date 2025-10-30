import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./signup.css";
import Video from "../LoginMainPage/video/videoplayback.mp4";
import { signup } from "../../../actions/user";
import { createProfile } from "../../../actions/profiles";
import { addImage } from "../../../actions/images";
import $ from "jquery"

class Signup extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    biography: "",
    previous: "",
    offering: "",
    looking: "",
    phone: "",
    user: "",
    error: "",
  };

  uploadPic = (e) =>{
    // e.preventDefault();
    $('#UploadImage').trigger('click');
    console.log($('#UploadImage').prop('files'))
  
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      biography,
      previous,
      offering,
      looking,
      phone,
      user,
      error,
    } = this.state;
    $('body').on('change', '#UploadImage', function(){
      const file = this.files[0]
      addImage(file,0)
      console.log(file)
    });
    function handleFirstNameChange(e, ref) {
      ref.setState({
        firstName: e.target.value,
      });
    }
    function handleLastNameChange(e, ref) {
      ref.setState({
        lastName: e.target.value,
      });
    }
    function handleEmailChange(e, ref) {
      ref.setState({
        email: e.target.value,
      });
    }
    function handlePasswordChange(e, ref) {
      ref.setState({
        password: e.target.value,
      });
    }
    function handleRePasswordChange(e, ref) {
      if (e.target.value !== password) {
        ref.setState({
          error: "*Passwords do not match",
        });
      } else {
        ref.setState({
          error: "",
        });
      }
    }
    function handleBiographyChange(e, ref) {
      ref.setState({
        biography: e.target.value,
      });
    }
    function handlePreviousChange(e, ref) {
      ref.setState({
        previous: e.target.value,
      });
    }
    function handleOfferingChange(e, ref) {
      ref.setState({
        offering: e.target.value,
      });
    }
    function handleLookingChange(e, ref) {
      ref.setState({
        looking: e.target.value,
      });
    }
    function handlePhoneChange(e, ref) {
      ref.setState({
        phone: e.target.value,
      });
    }
    function handleUserChange(e, ref) {
      ref.setState({
        user: e.target.value,
      });
    }
    const { app } = this.props;

    function handleSignup(e) {
      e.preventDefault();
      if (
        !email ||
        email === "" ||
        !password ||
        password === "" ||
        !lastName ||
        lastName === "" ||
        !firstName ||
        firstName === "" ||
        !biography ||
        biography === "" ||
        !previous ||
        previous === "" ||
        !offering ||
        offering === "" ||
        !looking ||
        looking === "" ||
        !phone ||
        phone === "" ||
        !user ||
        user === ""
      ) {
        alert("Signup details can't be empty");
      } else {
        signup(
          {
            name: firstName + " " + lastName,
            username: user,
            password,
          },
          app
        ).then((json) => {
          console.log(json);
          if (json?.username) {
            createProfile({
              profileId: json.profileId,
              profilePic: {
                image_id: "1",
                image_url: "https://res.cloudinary.com/jammify/image/upload/v1607639236/bzeujacy9vhantonb1gr.jpg",
            },
              personalInfo: {
                description: biography,
                name: firstName + " " + lastName,
                gender: "M",
                age: 25,
              },
              works: {
                albums: previous,
                singles: "One Love",
              },
              offering: offering,
              lookingFor: looking,
              genres: "Rock, Pop",
              collaborators: 3,
              workDone: 1,
              contactInfo: {
                phone: phone || "9999999999",
                email: email,
              },
              gallery: {
               image_id: "1",
               image_url: "http://res.cloudinary.com/jammify/image/upload/v1607474867/spf9afplbqxyjhlmx4jq.jpg",
            },
              tags: "upcoming, artist, singer"
            });
          }
        });
      }
    }

    return app.state.currentUser ? (
      <Redirect to={{ pathname: "/main", state: { from: "/signup" } }} />
    ) : (
      <div>
        <video autoPlay loop muted class="fullAbsoluteCss video">
          <source src={Video} type="video/mp4" />
        </video>
        <div class="MainDiv1">
          <p>
            <h1>Sign Up</h1>
          </p>
          <form class="signup">
            <div class="row">
              <div class="formdiv">
                <p>First Name</p>
                <input
                  type="text"
                  name="first-name"
                  placeholder="First name"
                  onChange={(e) => handleFirstNameChange(e, this)}
                ></input>
              </div>
              <div class="formdiv">
                <p>Last Name</p>
                <input
                  type="text"
                  name="last-name"
                  placeholder="Last name"
                  onChange={(e) => handleLastNameChange(e, this)}
                ></input>
              </div>
            </div>
            <div class="row">
              <div class="formdiv">
                <p>Email</p>
                <input
                  class="longer"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handleEmailChange(e, this)}
                ></input>
              </div>
              <div class="formdiv">
                <p>Phone</p>
                <input
                  class="longer"
                  type="number"
                  name="phone"
                  placeholder="Phone number"
                  onChange={(e) => handlePhoneChange(e, this)}
                ></input>
              </div>
            </div>
            <div class="row">
              <div class="formdiv">
                <p>Username</p>
                <input
                  class="longer"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => handleUserChange(e, this)}
                ></input>
              </div>
              {/* <div class="formdiv">
              <label class="ImgUpload">
              <input class="upload" type="file" id="UploadImage" onClick = {this.uploadPic}/>
                Upload Picture
                </label>
            </div> */}
            </div>
            <div class="row">
              <div class="formdiv">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="******"
                  onChange={(e) => handlePasswordChange(e, this)}
                ></input>
              </div>
              <div class="formdiv">
                <p>Re-Enter Password</p>
                <input
                  type="password"
                  name="re-password"
                  placeholder="******"
                  onChange={(e) => handleRePasswordChange(e, this)}
                ></input>
                <p>{error}</p>
              </div>
            </div>
            <div class="row">
              <div class="formdiv">
                <p>Biography</p>
                <textarea
                  rows="4"
                  cols="70"
                  name="biography"
                  placeholder="Tell us about you!"
                  onChange={(e) => handleBiographyChange(e, this)}
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="formdiv">
                <p>Previous Works</p>
                <textarea
                  rows="4"
                  cols="70"
                  name="previous"
                  placeholder="Mention all your previous work here!"
                  onChange={(e) => handlePreviousChange(e, this)}
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="formdiv">
                <p>Offering</p>
                <input
                  type="text"
                  name="Offering"
                  placeholder="Eg: Production, Mixing, etc."
                  onChange={(e) => handleOfferingChange(e, this)}
                ></input>
              </div>
              <div class="formdiv">
                <p>Looking for</p>
                <input
                  type="text"
                  name="looking"
                  placeholder="Singer, Guitarist, etc."
                  onChange={(e) => handleLookingChange(e, this)}
                ></input>
              </div>
            </div>
            <center>
              <button class="SubmitButton" type="submit" onClick={handleSignup}>
                Sign Up
              </button>
              <p class="Signup">
                Already have an account?&nbsp;&nbsp;
                <Link to="/" class="Link">
                  Login
                </Link>
              </p>
            </center>
          </form>
        </div>
      </div>
    );
  }
}
export default Signup;
