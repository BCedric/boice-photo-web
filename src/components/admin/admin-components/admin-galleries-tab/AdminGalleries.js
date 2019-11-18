import React from 'react'
import { connect } from 'react-redux'
import { galleriesSelector, currentGallerySelector } from 'redux/admin-redux/selectors'
import { getGalleries, setCurrentGallery, deleteGallery } from 'redux/admin-redux/actions'

import AdminGalleryPictures from './AdminGalleryPictures'
import AdminGalleryForm from './AdminGalleryForm'

import SelectableEntitiesList from 'components/SelectableEntitiesList'

const AdminGalleries = connect(
    state => ({
        galleries: galleriesSelector(state),
        selectedGallery: currentGallerySelector(state)
    }),
    dispatch => ({
        getGalleries: () => getGalleries()(dispatch),
        setCurrentGallery: gallery => dispatch(setCurrentGallery(gallery)),
        deleteGallery: gallery => deleteGallery(gallery.id)(dispatch)
    })
)(
    function (props) {
        const { galleries, getGalleries, setCurrentGallery, selectedGallery } = props
        return (
            <div>
                <SelectableEntitiesList
                    entities={galleries}
                    displayEntity={gallery => gallery.name}
                    setCurrentEntity={setCurrentGallery}
                    getEntities={getGalleries}
                    selectedEntity={selectedGallery}
                    componentToDisplay={() => <AdminGalleryPictures />}
                    entityForm={(closeForm, editedEntity) => <AdminGalleryForm closeForm={closeForm} gallery={editedEntity} />}
                    deleteEntity={(gallery) => props.deleteGallery(gallery)}
                />
            </div>
        )
    }
)

export default AdminGalleries