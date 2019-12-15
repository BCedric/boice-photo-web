import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'

import {
  setCurrentPictureIndex,
  getPictures,
  setGallery,
  addGalleryPictures,
  loadMorePictures
} from 'redux/gallery-redux/actions'
import {
  isFetchingSelector,
  gallerySelector,
  currentImageSelector,
} from 'redux/gallery-redux/selectors'
import GalleryLightbox from './gallery-components/GalleryLightbox'

import config from 'config'
import Fade from 'components/Fade'
import PicturesList from './gallery-components/PicturesList'

const THRESHOLD_RELOAD = 300

const Gallery = connect(
  state => {
    return {
      isFetching: isFetchingSelector(state),
      gallery: gallerySelector(state),
      currentImage: currentImageSelector(state),
    }
  },
  dispatch => ({
    getPictures: galleryId => getPictures(galleryId)(dispatch),
    setCurrentPictureIndex: id => dispatch(setCurrentPictureIndex(id)),
    setGallery: (gallery) => dispatch(setGallery(gallery)),
    addGalleryPictures: (pictures) => dispatch(addGalleryPictures(pictures)),
    loadMorePictures: () => dispatch(loadMorePictures())
  })
)(
  class extends React.Component {
    componentDidMount() {
      const { addGalleryPictures, getPictures, match } = this.props
      addGalleryPictures(null)
      getPictures(match.params.galleryId)
      this.addScrollEventListener()

    }

    componentWillUnmount() {
      const { addGalleryPictures, setGallery } = this.props
      document.removeEventListener('scroll', this.scrollHandling);
      addGalleryPictures(null)
      setGallery(null)
    }

    addScrollEventListener = () => document.addEventListener('scroll', this.scrollHandling, { once: true })

    scrollHandling = event => {
      setTimeout(() => this.addScrollEventListener(), 100)
      const scrollMax = document.documentElement.scrollHeight - document.documentElement.clientHeight
      if (scrollMax - THRESHOLD_RELOAD < window.scrollY) {
        this.props.loadMorePictures()
      }
    }

    render() {
      const { gallery, isFetching, currentImage, match } = this.props
      const picturesForLightbox = gallery != null && gallery.pictures.map(picture => ({ src: `${config.addressServer}${picture.addr}`, width: picture.width, height: picture.height }))

      return (
        <div className="gallery" onScroll={(event) => this.scrollHandling(event)}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Boïce Photo | {gallery && match.params.galleryId ? gallery.name : 'Toutes les photos'}</title>
            <meta name="description" content={`Boïce Photo, ${gallery && match.params.galleryId ? gallery.name : 'Toutes les photos'}`} />
          </Helmet>
          <div>
            <div style={{ height: '20px' }}>{isFetching}</div>
            <Fade show={!isFetching && gallery != null}>
              {gallery != null &&
                <div >
                  <h1>
                    {gallery.name}
                  </h1>
                  <div className="centered-h">
                    <div className="paragraph gallery-description" dangerouslySetInnerHTML={{ __html: gallery.description }} />
                  </div>
                  <div className="centered-h">
                    <div className="gallery-pictures-container">
                      <PicturesList />
                    </div>
                  </div>
                  <GalleryLightbox pictures={picturesForLightbox} pictureIndex={currentImage} setCurrentPicture={setCurrentPictureIndex} />
                </div>
              }
            </Fade>
            {isFetching && <div className="loader-container">
              <CircularProgress size={100} />
            </div>}
          </div>
        </div>
      );
    }
  })
export default Gallery;
