import React from 'react'
import { connect } from 'react-redux'
import { ListItemText } from '@material-ui/core'

import { deletePicture } from 'redux/admin-redux/actions'
import { currentGallerySelector } from 'redux/admin-redux/selectors'

import config from 'config'
import AdminAddPictureModal from './AdminAddPictureModal'
import EntitiesList from 'components/EntitiesList'

import './AdminGalleryPictures.css'

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

        const actions = [{
            icon: 'delete',
            color: 'error',
            onClick: pictureId => deletePicture(pictureId)
        }]
        return (
            <div className="pictures-collection">
                <AdminAddPictureModal galleryId={gallery.id}></AdminAddPictureModal>
                <EntitiesList
                    actions={actions}
                    entities={pictures}
                    renderEntity={entity => (
                        <div className="entity-content" >
                            <ListItemText >
                                <div className="list-item-content">
                                    <img className="entity-img" alt={entity.name} src={`${config.adressServer}${entity.addr}`} />
                                    <span>{entity.name}</span>
                                </div>
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