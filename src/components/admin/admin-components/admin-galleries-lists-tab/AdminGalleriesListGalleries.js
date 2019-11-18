import React from 'react'
import { connect } from 'react-redux'

import EntitiesList from 'components/EntitiesList'
import { currentGalleriesListSelector } from 'redux/admin-redux/selectors'
import { ListItemText } from '@material-ui/core'
import AdminAddGalleryModal from './AdminAddGalleryModal'
import { removeGalleryToList } from 'redux/admin-redux/actions'

const AdminGalleriesListGalleries = connect(
    state => ({
        galleriesList: currentGalleriesListSelector(state)
    }),
    dispatch => ({
        removeGalleryToList: (id, body) => removeGalleryToList(id, body)(dispatch)
    })
)(
    function (props) {
        const { galleriesList } = props
        const galleries = galleriesList != null && galleriesList.galleries
        return (
            <div>
                <AdminAddGalleryModal />
                <EntitiesList
                    deleteEntity={(entityId) => props.removeGalleryToList(galleriesList.id, { galleryId: entityId })}
                    entities={galleries}
                    renderEntity={entity => (
                        <ListItemText>{entity.name}</ListItemText>
                    )}
                >

                </EntitiesList>
            </div>
        )
    }
)

export default AdminGalleriesListGalleries