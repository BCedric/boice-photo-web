import {default as GalleryPhotos} from 'react-photo-gallery'
import { connect } from 'react-redux'
import Lightbox from 'react-images'
import React from 'react'
import { fetchImgAddr, loadImages } from 'actions'
import { imgAddrSelector, imgSelector } from 'selectors'

const Gallery = connect(
  state => {
    return {
      imgAddr: imgAddrSelector(state),
      imgs: imgSelector(state)
    }
  },
  (dispatch, props) => ({
      fetchImgAddr: arg => fetchImgAddr(arg)(dispatch),
      loadImages:  () => dispatch(loadImages())
  })
)(class extends React.Component {
  constructor(props) {
    super();
    this.state = { currentImage: 0, pictures: [], galleryId: props.match.params.galleryId };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  componentWillMount () {
    this.props.fetchImgAddr(this.state.galleryId)
  }

  componentDidMount() {
    // this.props.fetchImgAddr(this.state.galleryId)
    // this.props.loadImages()
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
    if (this.props.imgs === undefined || this.props.imgAddr.toJS().length !== this.props.imgs.toJS().length) {
      this.props.loadImages()
    }
    return (
      <div>
        <h2>Gallery</h2>
        { this.props.imgs !== undefined
        ? <div>
            <GalleryPhotos photos={this.props.imgs.toJS()} columns={this.props.columns} onClick={this.openLightbox}/>
            <Lightbox
              theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
              images={this.props.imgs.toJS().map(x => ({ ...x, srcset: x.srcSet, caption: x.title }))}
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
