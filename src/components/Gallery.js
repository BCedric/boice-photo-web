import {default as GalleryPhotos} from 'react-photo-gallery'
import Helmet from 'react-helmet'
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
import FadeComponent from 'fade-component'
import './styles/Gallery.css'

const THRESHOLD_RELOAD = 50

const VRAC_DESCRIPTION = "Si vous voulez voir des photos de manière alétoire, qui n'ont donc rien à voir les unes avec les autres, vous êtes au bon endroit !"

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
    this.state = {display: false, loading: true}
  }

  componentDidMount () {
    this.props.fetchImgAddr(this.props.match.params.galleryId)
    document.addEventListener('scroll', this.handleScroll)
  }

  componentWillUpdate (nextProps) {
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
    const scrollMax = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if(scrollMax - THRESHOLD_RELOAD < window.scrollY) this.props.loadMore()
  }

  openLightbox(event, obj) {
    const {setLightboxIsOpen, setCurrentImage, loadMore, imgs} = this.props
    setLightboxIsOpen(true)
    setCurrentImage(obj.index)
    if(imgs.length === obj.index+1) loadMore()
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
    const {currentImage, setCurrentImage, imgs, loadMore} = this.props
    if(imgs.length === currentImage+2) loadMore()
    setCurrentImage(currentImage + 1)
  }

  displayGallery() {
    const { imgs } = this.props
    return imgs !== undefined
  }

  render() {
    console.log(this.props);
    const { columns, currentImage, lightboxIsOpen, gallery, imgs, match } = this.props
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Boïce Photo | {gallery && match.params.galleryId ? gallery.name : 'Vrac'}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <FadeComponent
          onLoad={() => this.setState({loading: true})}
          onLoaded= {() => this.setState({loading: false})}
          display={this.displayGallery()}
          onCompositionStart={() => console.log('onCompositionStart')}>
        {gallery && <h2> {match.params.galleryId ? gallery.name : 'Vrac'} </h2>}

        { gallery && <p className='description'>{
          match.params.galleryId
          ? gallery.description
          : VRAC_DESCRIPTION
        }</p>
        }
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

          </FadeComponent>
      </div>
    );
  }
})
export default Gallery;
