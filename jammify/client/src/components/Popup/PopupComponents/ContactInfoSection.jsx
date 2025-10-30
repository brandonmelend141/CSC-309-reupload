import React, { Component } from 'react';

class ContactInfoSection extends Component {
  render() {
    const contactInfo = this.props.contactInfo;

    return(
      <div className="sectionInterior">
        <ul>
          <li key={1}>Phone Number: {contactInfo.phone}</li>
          <li key={2}>Email: {contactInfo.email}</li>
        </ul>
      </div>
    );
  }
}

export default ContactInfoSection;