import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { default as PicturesList } from 'react-photo-gallery'
import { CircularProgress } from '@material-ui/core'

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

import GalleryPicture from './gallery-components/GalleryPicture'
import config from 'config'
import Fade from 'components/Fade'

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
)(function ({
  getPictures,
  setCurrentPictureIndex,
  setGallery,
  addGalleryPictures,
  isFetching,
  gallery,
  currentImage,
  pictures,
  match,
}) {
  useEffect(() => {
    addGalleryPictures(null)
    getPictures(match.params.galleryId)
    return () => {
      addGalleryPictures(null)
      setGallery(null)
    }
  }, [match.params.galleryId, addGalleryPictures, getPictures, setGallery])

  const openLightbox = (obj) => {
    setCurrentPictureIndex(obj.index)
  }

  const imageRenderer = (picture) => {
    return (
      <GalleryPicture key={picture.index} picture={picture} onClick={openLightbox} />
    )
  }

  const picturesForList = gallery != null && pictures.map(picture => ({ src: `${config.addressServer}${picture.addr}`, width: picture.width, height: picture.height }))

  return (
    <div className="gallery">
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
                  <PicturesList renderImage={(picture) => imageRenderer(picture)} photos={picturesForList} columns={4} onClick={openLightbox} >LOADING</PicturesList>
                </div>
              </div>
              <GalleryLightbox pictures={picturesForList} pictureIndex={currentImage} setCurrentPicture={setCurrentPictureIndex} />
            </div>
          }
        </Fade>
        {isFetching && <div className="loader-container">
          <CircularProgress size={100} />
        </div>}
      </div>

    </div>
  );
})
export default Gallery;
