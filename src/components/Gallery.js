import {default as GalleryPhotos} from 'react-photo-gallery'
import { connect } from 'react-redux'
import Lightbox from 'react-images'
import React from 'react'
import { fetchImgAddr, loadImages, setGalleryId } from 'actions'
import { imgAddrSelector, imgSelector, galleryIdSelector } from 'selectors'

const Gallery = connect(
  state => {
    return {
      imgAddr: imgAddrSelector(state),
      imgs: imgSelector(state),
      galleryId: galleryIdSelector(state)
    }
  },
  (dispatch, props) => ({
      fetchImgAddr: arg => fetchImgAddr(arg)(dispatch),
      loadImages:  () => dispatch(loadImages()),
      setGalleryId: galleryId => dispatch(setGalleryId(galleryId))
  })
)(class extends React.Component {
  constructor(props) {
    super();
    props.setGalleryId(props.match.params.galleryId)
    this.state = { currentImage: 0, pictures: []  };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount () {
    this.props.fetchImgAddr(this.props.galleryId)
  }

  componentWillUpdate (nextProps) {
    const { imgs, imgAddr, loadImages, galleryId } = nextProps
    if(this.props.galleryId !== galleryId) {
      this.props.fetchImgAddr(galleryId)
    }
    if((imgAddr !== undefined && imgs === undefined) || (imgAddr !== undefined && imgs !== undefined && imgAddr.toJS().length !== imgs.toJS().length)) {
      loadImages()
    }
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    const { imgs, columns } = this.props
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
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
              width={1600}
            />
          </div>
        : <p></p> }

      </div>
    );
  }
})


export default Gallery;
