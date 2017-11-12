import {default as GalleryPhotos} from 'react-photo-gallery'
import { connect } from 'react-redux'
import Lightbox from 'react-images'
import React from 'react'
import {
  fetchImgAddr,
  loadImages,
  loadMore,
  razImgs,
  setCurrentImage,
  setLightboxIsOpen
} from 'gallery-redux/actions'
import {
  imgsSelector,
  nbImgsSelector,
  currentImageSelector,
  lightboxIsOpenSelector,
  isFetchingSelector,
  gallerySelector
} from 'gallery-redux/selectors'
import './styles/Gallery.css'

const THRESHOLD_RELOAD = 50

const Gallery = connect(
  state => {
    return {
      imgs: imgsSelector(state),
      nbImgs: nbImgsSelector(state),
      currentImage: currentImageSelector(state),
      lightboxIsOpen: lightboxIsOpenSelector(state),
      isFetching: isFetchingSelector(state),
      gallery: gallerySelector(state)
    }
  },
  dispatch => ({
      fetchImgAddr: arg => fetchImgAddr(arg)(dispatch),
      loadImages:  () => dispatch(loadImages()),
      razImgs: () => dispatch(razImgs()),
      loadMore: () => dispatch(loadMore()),
      setCurrentImage: id => dispatch(setCurrentImage(id)),
      setLightboxIsOpen: bool => dispatch(setLightboxIsOpen(bool))
  })
)(class extends React.Component {
  constructor(props) {
    super();
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  // componentWillMount () {
  //   console.log('componentWillMount');
  // }

  componentDidMount () {
    this.props.fetchImgAddr(this.props.match.params.galleryId)
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUpdate (nextProps) {
    console.log('componentWillUpdate');
    const { fetchImgAddr, loadImages, currentImage, loadMore, razImgs, gallery, match } = nextProps
    if(gallery !== undefined && this.props.match.params.galleryId !== nextProps.match.params.galleryId){
      razImgs()
      fetchImgAddr(match.params.galleryId)
    }
    if(window.scrollMaxY === 0
      && ((nextProps.isFetching !== undefined && !nextProps.isFetching)
          || nextProps.isFetching === undefined)
    ) {
      loadImages()
    }
    if(gallery !== undefined && currentImage === gallery.pictures.length-1) {
      loadMore()
    }
  }

  componentWillUnmount() {
    this.props.razImgs()
  }

  handleScroll = (event) => {
    if(window.scrollMaxY - THRESHOLD_RELOAD < window.scrollY) this.props.loadMore()
  }

  openLightbox(event, obj) {
    const {setLightboxIsOpen, setCurrentImage} = this.props
    setLightboxIsOpen(true)
    setCurrentImage(obj.index)
  }
  closeLightbox() {
    const {setLightboxIsOpen, setCurrentImage} = this.props
    setLightboxIsOpen(false)
    setCurrentImage(0)
  }
  gotoPrevious() {
    const {currentImage, setCurrentImage} = this.props
    setCurrentImage(currentImage - 1)
  }
  gotoNext() {
    const {currentImage, setCurrentImage} = this.props
    setCurrentImage(currentImage + 1)
  }

  render() {
    const { columns, currentImage, lightboxIsOpen, gallery, imgs } = this.props
    // console.log(this.props);
    return (
      <div>
        <h2>{gallery && gallery.name }</h2>
        { gallery && <p className='description'>{gallery.description}</p> }
        { imgs && <div>
            <GalleryPhotos className='gallery' photos={imgs} columns={columns} onClick={this.openLightbox}>LOADING</GalleryPhotos>
            <Lightbox
              theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
              images={imgs.map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
              backdropClosesModal={true}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={currentImage}
              isOpen={lightboxIsOpen}
              width={1600}
            />
          </div> }

      </div>
    );
  }
})


export default Gallery;
