import React from 'react'
import { connect } from 'react-redux'

import { currentGalleriesListSelector } from 'redux/admin-redux/admin-galleries-list-redux/selectors'
import { removeGalleryToList } from 'redux/admin-redux/admin-galleries-list-redux/actions'

import EntitiesList from 'components/EntitiesList'
import { ListItemText } from '@material-ui/core'
import AdminAddGalleryModal from './AdminAddGalleryModal'

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

        const actions = [{
            icon: 'link_off',
            color: 'error',
            onClick: (entityId) => props.removeGalleryToList(galleriesList.id, { galleryId: entityId })
        }]

        return (
            <div>
                <AdminAddGalleryModal />
                <EntitiesList
                    actions={actions}
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