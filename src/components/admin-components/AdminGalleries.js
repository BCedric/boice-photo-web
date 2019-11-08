import React from 'react'
import { connect } from 'react-redux'
import { galleriesSelector } from 'admin-redux/selectors'
import { getGalleries } from 'admin-redux/actions'

import AdminGalleryPictures from './AdminGalleryPictures'
import { ListItem, List } from '@material-ui/core'
import AdminGalleryForm from './AdminGalleryForm'

import './AdminGalleries.css'

const AdminGalleries = connect(
    state => ({
        galleries: galleriesSelector(state)
    }),
    dispatch => ({
        getGalleries: () => getGalleries()(dispatch)
    })
)(
    class extends React.Component {

        constructor(props) {
            super(props)
            this.state = { selectedGallery: null }
        }
        componentDidMount() {
            this.props.getGalleries()
        }

        selectGallery = (gallery) => {
            this.setState({ selectedGallery: gallery })
        }

        render() {
            const { galleries } = this.props
            const { selectedGallery } = this.state
            return (
                <div className="galleries-container">
                    {galleries != null &&
                        <List>
                            {galleries.map((gallery, index) => (
                                <ListItem
                                    key={index}
                                    onClick={() => this.selectGallery(gallery)}
                                    selected={selectedGallery != null && selectedGallery.id === gallery.id}
                                >
                                    {gallery.name}
                                </ListItem>
                            ))}
                        </List>
                    }
                    <div className="gallery-container">
                        {selectedGallery != null &&
                            <div>
                                <AdminGalleryForm gallery={selectedGallery} />
                                <AdminGalleryPictures gallery={selectedGallery} />
                            </div>
                        }
                    </div>
                </div>
            )
        }
    }
)

export default AdminGalleries