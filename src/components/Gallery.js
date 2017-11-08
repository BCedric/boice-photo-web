import {default as GalleryPhotos} from 'react-photo-gallery'
import { connect } from 'react-redux'
import Lightbox from 'react-images'
import React from 'react'
import {
  fetchImgAddr,
  loadImages,
  loadMore,
  setGalleryId,
  razImgs,
  setCurrentImage,
  setLightboxIsOpen
} from 'gallery-redux/actions'
import {
  imgAddrSelector,
  imgSelector,
  galleryIdSelector,
  nbImgsSelector,
  currentImageSelector,
  lightboxIsOpenSelector,
  isFetchingSelector,
  galleryDescriptionSelector,
  galleryNameSelector
} from 'gallery-redux/selectors'
import './styles/Gallery.css'

const THRESHOLD_RELOAD = 50

const Gallery = connect(
  state => {
    return {
      imgAddr: imgAddrSelector(state),
      imgs: imgSelector(state),
      galleryId: galleryIdSelector(state),
      nbImgs: nbImgsSelector(state),
      currentImage: currentImageSelector(state),
      lightboxIsOpen: lightboxIsOpenSelector(state),
      isFetching: isFetchingSelector(state),
      galleryDescription: galleryDescriptionSelector(state),
      galleryName: galleryNameSelector(state)
    }
  },
  dispatch => ({
      fetchImgAddr: arg => fetchImgAddr(arg)(dispatch),
      loadImages:  () => dispatch(loadImages()),
      setGalleryId: galleryId => dispatch(setGalleryId(galleryId)),
      razImgs: () => dispatch(razImgs()),
      loadMore: () => dispatch(loadMore()),
      setCurrentImage: id => dispatch(setCurrentImage(id)),
      setLightboxIsOpen: bool => dispatch(setLightboxIsOpen(bool))
  })
)(class extends React.Component {
  constructor(props) {
    super();
    props.setGalleryId(props.match.params.galleryId)
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);

  }

  componentWillMount () {
    console.log('componentWillMount');
  }

  componentDidMount () {
    console.log('componentDidMount');
    this.forceUpdate()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUpdate (nextProps) {
    console.log('componentWillUpdate', window.innerHeight, window.outerHeight, window.scrollMaxY, window.screenY);
    const { fetchImgAddr, imgs, imgAddr, loadImages, galleryId, nbImgs, currentImage, loadMore, razImgs } = nextProps
    if((this.props.galleryId !== galleryId || imgAddr === undefined) && !nextProps.isFetching) {
      razImgs()
      fetchImgAddr(galleryId)
    }
    if(window.scrollMaxY === 0 || (imgAddr !== undefined && imgs === undefined) || (imgAddr !== undefined && imgs !== undefined && imgAddr.toJS().length + imgs.toJS().length !== nbImgs)) {
      loadImages()
    }
    if(imgs !== undefined && currentImage === imgs.toJS().length-1) {
      loadMore()
    }
  }

  componentDidUpdate () {
    console.log('componentDidUpdate');
    const {match, galleryId, setGalleryId} = this.props
    if(match.params.galleryId !== galleryId){
      setGalleryId(match.params.galleryId)
    }
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
    const { imgs, columns, currentImage, lightboxIsOpen, galleryDescription, galleryName } = this.props
    // console.log(this.props);
    return (
      <div>
        <h2>{galleryName ? galleryName : "Gallery"}</h2>
        { galleryDescription !== undefined
        ? <p className='description'>{galleryDescription}</p>
        : null }
        { imgs !== undefined
        ? <div>
            <GalleryPhotos className='gallery' photos={imgs.toJS()} columns={columns} onClick={this.openLightbox}/>
            <Lightbox
              theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
              images={imgs.toJS().map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
              backdropClosesModal={true}
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={currentImage}
              isOpen={lightboxIsOpen}
              width={1600}
            />
          </div>
        : <p></p> }

      </div>
    );
  }
})


export default Gallery;
