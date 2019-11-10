import React from 'react'
import { connect } from 'react-redux'
import { List, ListItem, Icon, ListItemText, ListItemSecondaryAction, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import config from 'config'
import { deletePicture, getGalleryPictures } from 'redux/admin-redux/actions'
import { currentPicturesSelector } from 'redux/admin-redux/selectors'

import AdminAddPictureModal from './AdminAddPictureModal'
import './AdminGalleryPictures.css'

const styles = {
    root: {
        width: '100%'
    },
    listItem: {
        cursor: 'initial'
    }
}


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
            if (nextProps.gallery.id !== this.props.gallery.id) {
                this.props.getGalleryPictures(this.props.gallery)
            }

        }

        deletePicture = pictureId => this.props.deletePicture(pictureId)

        render() {
            const pictures = this.props.currentPictures
            const { classes } = this.props
            return (
                <div className="pictures-collection">
                    <AdminAddPictureModal galleryId={this.props.gallery.id}></AdminAddPictureModal>
                    {pictures != null && <List className={classes.root}>
                        {pictures.map((picture, index) =>
                            <div>
                                <ListItem className={classes.listItem} key={index}>
                                    <div className="picture-content">
                                        <div>
                                            <img className="picture-img" alt={picture.name} src={`${config.adressServer}${picture.addr}`} />
                                        </div>
                                        <div className="picture-name">
                                        </div>
                                    </div>
                                    <ListItemText>
                                        <span>{picture.name}</span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <div className="actions" onClick={() => this.deletePicture(picture.id)}>
                                            <Icon>delete</Icon>
                                        </div>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index !== pictures.length - 1 && <Divider />}
                            </div>
                        )}
                    </List>}
                </div>
            )
        }
    }
)

export default withStyles(styles)(AdminGalleryPictures)