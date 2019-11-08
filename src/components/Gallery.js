import { default as GalleryPhotos } from 'react-photo-gallery'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import React from 'react'
import {
  fetchImgAddr,
  loadImages,
  loadMore,
  razImgs,
  setCurrentPictureIndex,
  getPictures
} from 'redux/gallery-redux/actions'
import {
  imgsSelector,
  nbImgsSelector,
  currentImageSelector,
  isFetchingSelector,
  gallerySelector
} from 'redux/gallery-redux/selectors'
import FadeComponent from 'components/fade-component'
import config from 'config'
import './styles/Gallery.css'
import GalleryPicture from './gallery-components/GalleryPicture'

const THRESHOLD_RELOAD = 50

const Gallery = connect(
  state => {
    return {
      // imgs: imgsSelector(state),
      // nbImgs: nbImgsSelector(state),
      currentImage: currentImageSelector(state),
      isFetching: isFetchingSelector(state),
      gallery: gallerySelector(state)
    }
  },
  dispatch => ({
    getPictures: galleryId => getPictures(galleryId)(dispatch),
    // fetchImgAddr: arg => fetchImgAddr(arg)(dispatch),
    // loadImages: () => dispatch(loadImages()),
    // razImgs: () => dispatch(razImgs()),
    // loadMore: () => dispatch(loadMore()),
    setCurrentPictureIndex: id => dispatch(setCurrentPictureIndex(id)),
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

  openLightbox = (event, obj) => {
    this.props.setCurrentPictureIndex(obj.index)
  }


  // componentWillUpdate(nextProps) {
  //   const { fetchImgAddr, loadImages, currentImage, loadMore, razImgs, gallery, match } = nextProps

  //   if (gallery !== undefined && this.props.match.params.galleryId !== nextProps.match.params.galleryId) {
  //     razImgs()
  //     fetchImgAddr(match.params.galleryId)
  //   }
  //   if (window.scrollMaxY === 0
  //     && ((nextProps.isFetching !== undefined && !nextProps.isFetching)
  //       || nextProps.isFetching === undefined)
  //   ) {
  //     // loadImages()
  //   }
  //   if (gallery !== undefined && currentImage === gallery.pictures.length - 1) {
  //     loadMore()
  //   }
  // }

  // componentWillUnmount() {
  //   this.props.razImgs()
  // }

  // handleScroll = (event) => {
  //   const scrollMax = document.documentElement.scrollHeight - document.documentElement.clientHeight
  //   if (scrollMax - THRESHOLD_RELOAD < window.scrollY) this.props.loadMore()
  // }

  // displayGallery() {
  //   const { imgs } = this.props
  //   return imgs !== undefined
  // }

  render() {
    const { columns, currentImage, lightboxIsOpen, gallery, imgs, match, isFetching } = this.props
    const pictures = gallery != null && gallery.pictures.map(picture => ({ src: `${config.adressServer}${picture.addr}`, width: picture.width, height: picture.height }))
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | {gallery && match.params.galleryId ? gallery.name : 'Vrac'}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        {gallery != null &&
          <FadeComponent display={!isFetching}>
            <div>
              <h1>{gallery.name}</h1>
              <p className='description'>{
                gallery.description
              }</p>
              <GalleryPhotos className='gallery' photos={pictures} columns={4} onClick={this.openLightbox} >LOADING</GalleryPhotos>
              <GalleryPicture pictures={pictures} pictureIndex={this.props.currentImage} setCurrentPicture={this.props.setCurrentPictureIndex} />
            </div>
          </FadeComponent>
        }
        {/* <FadeComponent
          onLoad={() => this.setState({ loading: true })}
          onLoaded={() => this.setState({ loading: false })}
          display={this.displayGallery()}
          onCompositionStart={() => console.log('onCompositionStart')}>
          {gallery && <h2> {match.params.galleryId ? gallery.name : 'Vrac'} </h2>}

          {imgs && <div>
            <GalleryPhotos className='gallery' photos={imgs} columns={columns} onClick={this.openLightbox}>LOADING</GalleryPhotos>
          </div>}

        </FadeComponent> */}
      </div>
    );
  }
})
export default Gallery;
