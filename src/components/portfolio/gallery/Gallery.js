import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { default as PicturesList } from 'react-photo-gallery'

import {
  setCurrentPictureIndex,
  getPictures,
  setGallery,
  addGalleryPictures
} from 'redux/gallery-redux/actions'
import {
  isFetchingSelector,
  gallerySelector,
  currentImageSelector,
  galleryPicturesSelector
} from 'redux/gallery-redux/selectors'
import GalleryLightbox from './gallery-components/GalleryLightbox'

import { CircularProgress } from '@material-ui/core'
import GalleryPicture from './gallery-components/GalleryPicture'
import { withStyles } from '@material-ui/styles'

const styles = {
  picturesContainer: {
    width: '95%',
    margin: 'auto'
  }
}


const Gallery = connect(
  state => {
    return {
      isFetching: isFetchingSelector(state),
      gallery: gallerySelector(state),
      currentImage: currentImageSelector(state),
      pictures: galleryPicturesSelector(state)
    }
  },
  dispatch => ({
    getPictures: galleryId => getPictures(galleryId)(dispatch),
    setCurrentPictureIndex: id => dispatch(setCurrentPictureIndex(id)),
    setGallery: (gallery) => dispatch(setGallery(gallery)),
    addGalleryPictures: (pictures) => dispatch(addGalleryPictures(pictures))
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
      console.log(nextGalleryListId, currentGalleryListId);
      this.props.addGalleryPictures(null)
      this.props.getPictures(this.props.match.params.galleryId)
    }
  }

  componentWillUnmount() {
    this.props.addGalleryPictures(null)
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
    const { gallery, match, isFetching, classes } = this.props
    const pictures = gallery != null && this.props.pictures.map(picture => ({ src: `${picture.addr}`, width: picture.width, height: picture.height }))

    return (
      <div >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | {gallery && match.params.galleryId ? gallery.name : 'Vrac'}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div>
          {gallery != null &&
            <div >
              <h1>
                {gallery.name}
              </h1>
              <p className="paragraph">{
                gallery.description
              }</p>
              <div className={classes.picturesContainer}>
                <PicturesList className='gallery' renderImage={(picture) => this.imageRenderer(picture)} photos={pictures} columns={4} onClick={this.openLightbox} >LOADING</PicturesList>
              </div>
              <GalleryLightbox pictures={pictures} pictureIndex={this.props.currentImage} setCurrentPicture={this.props.setCurrentPictureIndex} />
            </div>
          }
          {isFetching && <div className="loader-container">
            <CircularProgress size={100} />
          </div>}
        </div>

      </div>
    );
  }
})
export default withStyles(styles)(Gallery);
