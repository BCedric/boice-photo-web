import React from 'react'
import { connect } from 'react-redux'
import { Collection, CollectionItem, Icon } from 'react-materialize'

import config from 'config'

import './AdminGalleryPictures.css'
import { deletePicture, getGalleryPictures } from 'redux/admin-redux/actions'
import AdminAddPictureModal from './AdminAddPictureModal'
import { currentPicturesSelector } from 'redux/admin-redux/selectors'


const AdminGalleryPictures = connect(
    state => ({
        currentPictures: currentPicturesSelector(state)
    }),
    dispatch => ({
        deletePicture: pictureId => deletePicture(pictureId)(dispatch),
        getGalleryPictures: gallery => getGalleryPictures(gallery)(dispatch)
    })
)(
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = { pictures: null }
        }

        componentDidMount() {
            this.props.getGalleryPictures(this.props.gallery)
        }

        componentDidUpdate(nextProps) {
            if (nextProps.gallery.id != this.props.gallery.id) {
                this.props.getGalleryPictures(this.props.gallery)
            }

        }

        deletePicture = pictureId => this.props.deletePicture(pictureId)

        render() {
            const pictures = this.props.currentPictures
            return (
                <div className="pictures-collection">
                    <AdminAddPictureModal galleryId={this.props.gallery.id}></AdminAddPictureModal>
                    {pictures != null && <Collection >
                        {pictures.map((picture, index) =>
                            <CollectionItem key={index}>
                                <div className="picture-content">
                                    <div>
                                        <img className="picture-img" src={`${config.adressServer}${picture.addr}`} />
                                    </div>
                                    <div className="picture-name">
                                        <span>{picture.name}</span>
                                    </div>
                                </div>
                                <div className="actions" onClick={() => this.deletePicture(picture.id)}>
                                    <Icon>delete</Icon>
                                </div>
                            </CollectionItem>
                        )}
                    </Collection>}
                </div>
            )
        }
    }
)

export default AdminGalleryPictures