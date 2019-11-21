import { default as GalleryPhotos } from 'react-photo-gallery'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import React from 'react'
import {
  setCurrentPictureIndex,
  getPictures,
  setGallery
} from 'redux/gallery-redux/actions'
import {
  currentImageSelector,
  isFetchingSelector,
  gallerySelector
} from 'redux/gallery-redux/selectors'
import GalleryPicture from './gallery-components/GalleryPicture'

import './Gallery.css'
import { CircularProgress } from '@material-ui/core'


const Gallery = connect(
  state => {
    return {
      currentImage: currentImageSelector(state),
      isFetching: isFetchingSelector(state),
      gallery: gallerySelector(state)
    }
  },
  dispatch => ({
    getPictures: galleryId => getPictures(galleryId)(dispatch),
    setCurrentPictureIndex: id => dispatch(setCurrentPictureIndex(id)),
    setGallery: (gallery) => dispatch(setGallery(gallery))
  })
)(class extends React.Component {

  componentDidMount() {
    this.props.getPictures(this.props.match.params.galleryId)
    // document.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(nextProps) {
    const nextGalleryListId = nextProps.match.params.galleryId
    const currentGalleryListId = this.props.match.params.galleryId
    if (nextGalleryListId !== currentGalleryListId) {
      this.props.getPictures(this.props.match.params.galleryId)
    }
  }

  componentWillUnmount() {
    this.props.setGallery(null)
  }

  openLightbox = (_, obj) => {
    this.props.setCurrentPictureIndex(obj.index)
  }

  render() {
    const { gallery, match, isFetching } = this.props
    const pictures = gallery != null && gallery.pictures.map(picture => ({ src: `${picture.addr}`, width: picture.width, height: picture.height }))

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | {gallery && match.params.galleryId ? gallery.name : 'Vrac'}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {gallery != null &&
          <div>
            <h1>{gallery.name}</h1>
            <p className='description'>{
              gallery.description
            }</p>
            <GalleryPhotos className='gallery' photos={pictures} columns={4} onClick={this.openLightbox} >LOADING</GalleryPhotos>
            <GalleryPicture pictures={pictures} pictureIndex={this.props.currentImage} setCurrentPicture={this.props.setCurrentPictureIndex} />
          </div>
        }
        {isFetching && <div className="gallery-loader-container">
          <CircularProgress size={100} />
        </div>}

      </div>
    );
  }
})
export default Gallery;
