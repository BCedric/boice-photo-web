import React from 'react'
import { connect } from 'react-redux'
import { ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { deletePicture, setPictureGalleryPreview } from 'redux/admin-redux/admin-gallery-redux/actions'
import { currentGallerySelector } from 'redux/admin-redux/admin-gallery-redux/selectors'

import config from 'config'
import AdminAddPictureModal from './AdminAddPictureModal'
import EntitiesList from 'components/EntitiesList'

const useStyles = makeStyles({
    listItemContent: {
        display: 'flex',
        alignItems: 'center'
    },
    entityImg: {
        marginRight: '0.5em',
        width: '8em'
    }
})

const AdminGalleryPictures = connect(
    state => ({
        gallery: currentGallerySelector(state)
    }),
    dispatch => ({
        deletePicture: pictureId => deletePicture(pictureId)(dispatch),
        setPictureGalleryPreview: pictureId => setPictureGalleryPreview(pictureId)(dispatch)
    })
)(
    function ({ gallery, deletePicture, setPictureGalleryPreview }) {
        const pictures = gallery != null && gallery.pictures
        const { listItemContent, entityImg } = useStyles()

        const actions = [
            {
                display: picture => !picture.galleryPreview
                ,
                icon: 'remove_red_eye',
                color: 'primary',
                onClick: pictureId => setPictureGalleryPreview(pictureId)
            },
            {
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
                                <div className={listItemContent}>
                                    <img className={entityImg} alt={entity.name} src={`${config.addressServer}${entity.addr}`} />
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