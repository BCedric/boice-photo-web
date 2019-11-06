import React from 'react'
import { connect } from 'react-redux'
import Lightbox from 'react-images'

const GalleryPicture = connect(

)(
    class extends React.Component {

        constructor(props) {
            super(props)
            this.state = { isLightBoxOpen: false, currentPicture: 0 }
        }

        closeLightbox = () => {
            this.props.setCurrentPicture(null)
        }

        gotoNext = () => {
            this.props.setCurrentPicture(this.props.pictureIndex + 1)
        }

        gotoPrevious = () => {
            this.props.setCurrentPicture(this.props.pictureIndex - 1)
        }

        render() {
            const { pictures } = this.props
            return (
                <Lightbox
                    theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
                    images={pictures}
                    backdropClosesModal={true}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.props.pictureIndex}
                    isOpen={this.props.pictureIndex != null}
                    width={1600}
                />
            )
        }
    }
)

export default GalleryPicture