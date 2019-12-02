import React from 'react'
import { connect } from 'react-redux'

import { getGalleries, setCurrentGallery, deleteGallery, putGallery } from 'redux/admin-redux/admin-gallery-redux/actions'
import { galleriesSelector, currentGallerySelector } from 'redux/admin-redux/admin-gallery-redux/selectors'

import AdminGalleryPictures from './AdminGalleryPictures'
import AdminGalleryForm from './AdminGalleryForm'

import Carousel from 'Icons/Carousel'

import SelectableEntitiesList from 'components/SelectableEntitiesList'

const AdminGalleries = connect(
    state => ({
        galleries: galleriesSelector(state),
        selectedGallery: currentGallerySelector(state)
    }),
    dispatch => ({
        getGalleries: () => getGalleries()(dispatch),
        setCurrentGallery: gallery => dispatch(setCurrentGallery(gallery)),
        deleteGallery: gallery => deleteGallery(gallery.id)(dispatch),
        putGallery: (galleryId, body) => putGallery(galleryId, body)(dispatch)
    })
)(
    function ({
        putGallery,
        deleteGallery,
        galleries,
        getGalleries,
        setCurrentGallery,
        selectedGallery,
    }) {
        const actions = [
            {
                display: gallery => gallery.isInCarousel,
                icon: 'ac_unit',
                onClick: gallery => putGallery(gallery.id, { isInCarousel: false })
            },
            {
                display: gallery => !gallery.isInCarousel,
                icon: (gallery) =>
                    <span className="clickable" onClick={() => {
                        putGallery(gallery.id, {
                            isInCarousel: true
                        })
                    }}>
                        <Carousel width={24} />
                    </span>
            }
        ]

        return (
            <div>
                <SelectableEntitiesList
                    actions={actions}
                    entities={galleries}
                    displayEntity={gallery => gallery.name}
                    setCurrentEntity={setCurrentGallery}
                    getEntities={getGalleries}
                    selectedEntity={selectedGallery}
                    componentToDisplay={() => <AdminGalleryPictures />}
                    entityForm={(closeForm, editedEntity) => <AdminGalleryForm closeForm={closeForm} gallery={editedEntity} />}
                    deleteEntity={(gallery) => deleteGallery(gallery)}
                />
            </div>
        )
    }
)

export default AdminGalleries