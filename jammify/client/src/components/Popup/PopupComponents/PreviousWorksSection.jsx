import React, { Component } from 'react';

class PreviousWorksSection extends Component {
  render() {
    const {albums, singles} = this.props.works

    return(
      <div className="sectionInterior">
        <ul>
          {singles.map((single, index) => (
            <li key={index}>{single}</li>))}
        </ul>
        <ul>
          {albums.map((album, index) => (
            <li key={index}>{album}</li>))}
        </ul>
      </div>
    );
  }
}

export default PreviousWorksSection;