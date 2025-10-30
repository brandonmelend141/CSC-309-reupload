import React, { Component } from 'react';

class GallerySection extends Component {

    render() {

        const gallery = this.props.galleryPictures
        const galleryPictures = this.props.galleryPictures[0]
        // photos are stored/retrieved locally here but they'll be retrieved from server for phase 2
        // console.log(galleryPictures)
        // const picArray = galleryPictures.map(loc => require('../../../assets/img/' + loc))

        return(
            <div className='popupGallerySection'>
                {/* {picArray.map((pic,index) => <img className="galleryImg" key={index} src={pic}></img>)} */}
                {gallery.length != 0  && <img className="galleryImg" src={galleryPictures.image_url} alt = "SCPic"></img>}
            </div>
        )
    }
}

export default GallerySection;