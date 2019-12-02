import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Fab, Icon, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import { currentGalleriesListSelector } from 'redux/admin-redux/admin-galleries-list-redux/selectors'
import { addGalleryToList } from 'redux/admin-redux/admin-galleries-list-redux/actions'
import { galleriesSelector } from 'redux/admin-redux/admin-gallery-redux/selectors'

import Modal from 'components/Modal'

const AdminAddGalleryModal = connect(
    state => ({
        galleries: galleriesSelector(state),
        galleryList: currentGalleriesListSelector(state)
    }),
    dispatch => ({
        addGalleryToList: (id, body) => addGalleryToList(id, body)(dispatch)
    })
)(
    function (props) {
        const [gallerySelected, setGallerySelected] = useState(props.galleries[0].id)

        const handleChangeGallery = (event) => {
            setGallerySelected(event.target.value)
        }

        const getButtonToOpenModal = (open) =>
            <Fab color="primary" onClick={() => open()} ><Icon >add</Icon></Fab>

        return (
            <Modal
                title="Associer une galerie"
                onValidate={() => props.addGalleryToList(props.galleryList.id, { galleryId: gallerySelected })}
                getButton={getButtonToOpenModal}
            >
                <form className="form-line">
                    <FormControl >
                        <InputLabel >Galerie</InputLabel>
                        <Select value={gallerySelected} onChange={(event) => handleChangeGallery(event)}>
                            {props.galleries.map((gallery, index) =>
                                <MenuItem key={index} value={gallery.id}>{gallery.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </form>
            </Modal>
        )
    }
)

export default AdminAddGalleryModal