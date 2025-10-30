import React, { Component } from 'react';

class PersonalInfoSection extends Component {
  render() {
    const {name, gender, age} = this.props.personalInfo;

    return(
      <div className="sectionInterior">
          <p>Name: {name}</p>
          <p>Gender: {gender}</p>
          <p>Age: {age}</p>
      </div>
    );
  }
}

export default PersonalInfoSection;
