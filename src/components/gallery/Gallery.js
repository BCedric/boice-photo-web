import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { default as PicturesList } from 'react-photo-gallery'

import {
  setCurrentPictureIndex,
  getPictures,
  setGallery
} from 'redux/gallery-redux/actions'
import {
  isFetchingSelector,
  gallerySelector,
  currentImageSelector
} from 'redux/gallery-redux/selectors'
import GalleryLightbox from './gallery-components/GalleryLightbox'

import './Gallery.css'
import { CircularProgress } from '@material-ui/core'
import GalleryPicture from './gallery-components/GalleryPicture'


const Gallery = connect(
  state => {
    return {
      isFetching: isFetchingSelector(state),
      gallery: gallerySelector(state),
      currentImage: currentImageSelector(state)
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

  openLightbox = (obj) => {
    this.props.setCurrentPictureIndex(obj.index)
  }

  imageRenderer = (picture) => {
    return (
      <GalleryPicture key={picture.index} picture={picture} onClick={this.openLightbox} />
    )
  }

  render() {
    const { gallery, match, isFetching } = this.props
    const pictures = gallery != null && gallery.pictures.map(picture => ({ src: `${picture.addr}`, width: picture.width, height: picture.height }))

    return (
      <div >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | {gallery && match.params.galleryId ? gallery.name : 'Vrac'}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div className="gallery-container">
          {gallery != null &&
            <div >
              {/* <GalleryTitle> */}
              <h1>
                {gallery.name}
              </h1>
              {/* </GalleryTitle> */}
              <p className='description'>{
                gallery.description
              }</p>
              {/* {pictures.map((picture, index) => (
                <div key={index} style={{ display: 'inline-block' }}>
                  <img className="picture" src={picture.src} alt="fill murray" />
                </div>
              ))} */}
              <PicturesList className='gallery' renderImage={(picture) => this.imageRenderer(picture)} photos={pictures} columns={4} onClick={this.openLightbox} >LOADING</PicturesList>
              <GalleryLightbox pictures={pictures} pictureIndex={this.props.currentImage} setCurrentPicture={this.props.setCurrentPictureIndex} />
            </div>
          }
          {isFetching && <div className="gallery-loader-container">
            <CircularProgress size={100} />
          </div>}
        </div>

      </div>
    );
  }
})
export default Gallery;
