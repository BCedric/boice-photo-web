import React from 'react'
import { connect } from 'react-redux'
import { ListItemText } from '@material-ui/core'

import { deletePicture } from 'redux/admin-redux/actions'
import { currentGallerySelector } from 'redux/admin-redux/selectors'

import config from 'config'
import AdminAddPictureModal from './AdminAddPictureModal'
import EntitiesList from 'components/EntitiesList'

const AdminGalleryPictures = connect(
    state => ({
        gallery: currentGallerySelector(state)
    }),
    dispatch => ({
        deletePicture: pictureId => deletePicture(pictureId)(dispatch),
    })
)(
    function (props) {
        const { gallery, deletePicture } = props
        const pictures = gallery != null && gallery.pictures
        return (
            <div className="pictures-collection">
                <AdminAddPictureModal galleryId={gallery.id}></AdminAddPictureModal>
                <EntitiesList
                    deleteEntity={pictureId => deletePicture(pictureId)}
                    entities={pictures}
                    renderEntity={entity => (
                        <div className="entity-content" >
                            <div >
                                <div>
                                    <img className="entity-img" alt={entity.name} src={`${config.adressServer}${entity.addr}`} />
                                </div>
                                <div className="entity-name">
                                </div>
                            </div>
                            <ListItemText>
                                <span>{entity.name}</span>
                            </ListItemText>
                        </div>
                    )}
                >
                </EntitiesList>
            </div>
        )
    }
)

export default AdminGalleryPictures