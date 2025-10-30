import React, { Component } from 'react';

class OfferingSection extends Component {
  render() {
    const offering = this.props.offering;

    return(
      <div className="sectionInterior">
        <ul>
          {offering.map((skill, index) => (
            <li key={index}> {skill}</li>))}
        </ul>
      </div>
    );
  }
}

export default OfferingSection;