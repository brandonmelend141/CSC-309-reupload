import React, { Component } from 'react';

class LookingForSection extends Component {
  render() {
    const lookingFor = this.props.lookingFor;

    return(
      <div className="sectionInterior">
        <ul>
          {lookingFor.map((skill, index) => (
            <li key={index}>{skill}</li>))}
        </ul>
      </div>
    );
  }
}

export default LookingForSection;