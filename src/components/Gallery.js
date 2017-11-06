import {default as GalleryPhotos} from 'react-photo-gallery'
import { connect } from 'react-redux'
import Lightbox from 'react-images'
import React from 'react'
import { fetchImgAddr, loadImages, loadMore, setGalleryId, razImgs, setCurrentImage, setLightboxIsOpen } from 'gallery-redux/actions'
import { imgAddrSelector, imgSelector, galleryIdSelector, nbImgsSelector, currentImageSelector, lightboxIsOpenSelector } from 'gallery-redux/selectors'

const THRESHOLD_RELOAD = 50

const Gallery = connect(
  state => {
    return {
      imgAddr: imgAddrSelector(state),
      imgs: imgSelector(state),
      galleryId: galleryIdSelector(state),
      nbImgs: nbImgsSelector(state),
      currentImage: currentImageSelector(state),
      lightboxIsOpen: lightboxIsOpenSelector(state)
    }
  },
  (dispatch, props) => ({
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

  componentDidMount () {
    console.log('componentDidMount');
    const {razImgs} = this.props
    razImgs()
    this.forceUpdate()
    window.addEventListener('scroll', this.handleScroll)
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate');
    return true
  }

  componentWillUpdate (nextProps) {
    console.log('componentWillUpdate');
    const { fetchImgAddr, imgs, imgAddr, loadImages, galleryId, nbImgs, currentImage, loadMore } = nextProps
    if(galleryId !== galleryId || imgAddr === undefined) {
      fetchImgAddr(galleryId)
    }
    if((imgAddr !== undefined && imgs === undefined) || (imgAddr !== undefined && imgs !== undefined && imgAddr.toJS().length + imgs.toJS().length !== nbImgs)) {
      loadImages()
    }
    if(imgs !== undefined && currentImage === imgs.toJS().length-1) {
      loadMore()
    }
  }

  componentDidUpdate () {
    const {razImgs, match, galleryId, setGalleryId} = this.props
    if(match.params.galleryId !== galleryId){
      razImgs()
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
    console.log(this.props);
    const { imgs, columns, currentImage, lightboxIsOpen } = this.props
    return (
      <div>
        <h2>Gallery</h2>
        { imgs !== undefined
        ? <div>
            <GalleryPhotos photos={imgs.toJS()} columns={columns} onClick={this.openLightbox}/>
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
