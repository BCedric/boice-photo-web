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
  dispatch => ({
    fetchImgAddr: () => fetchImgAddr()(dispatch),
    loadImages:  () => dispatch(loadImages())
  })
)(class extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0, pictures: [] };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  componentWillMount () {
    this.props.fetchImgAddr()
  }

  componentDidMount() {
    this.props.loadImages()
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

  componentDidUpdate () {
    this.props.loadImages()
  }

  render() {
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
