import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { connect } from 'react-redux'

import './AdminGalleryForm.css'
import { putGallery, postGallery } from "redux/admin-redux/actions";

const AdminGalleryForm = connect(
    state => ({}),
    dispatch => ({
        putGallery: (galleryId, body) => putGallery(galleryId, body)(dispatch),
        postGallery: gallery => postGallery(gallery)(dispatch)
    })
)(
    class extends React.Component {
        constructor(props) {
            super(props)
            const gallery = props.gallery
            this.state = { name: this.initProperty(gallery, 'name'), description: this.initProperty(gallery, 'description') }
            this.filesInput = React.createRef()
        }

        initProperty(gallery, property) {
            return gallery != null && gallery[property] != null
                ? gallery[property]
                : ''
        }

        galleryHasChanged(prevProps) {
            return prevProps.gallery !== this.props.gallery
        }

        componentDidUpdate(prevProps) {
            if (this.galleryHasChanged(prevProps)) {
                if (this.props.gallery != null) {
                    const gallery = this.props.gallery
                    this.setState({ name: gallery.name, description: gallery.description != null ? gallery.description : '' })
                } else {
                    this.setState({ name: '', description: '' })
                }
            }

        }

        onInputChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }

        submit() {
            this.props.gallery != null
                ? this.props.putGallery(this.props.gallery.id, this.state)
                    .then(response => response.err == null && this.cancel())
                : this.props.postGallery({ ...this.state, files: this.filesInput.current.files })
                    .then(response => response.err == null && this.cancel())
        }

        cancel() {
            this.props.closeForm()
        }

        render() {
            const { name, description } = this.state
            const { gallery } = this.props
            return (
                <form noValidate autoComplete="off">
                    <TextField
                        label="Nom"
                        name="name"
                        multiline
                        variant="outlined"
                        value={name}
                        onChange={(event) => this.onInputChange(event)}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        variant="outlined"
                        value={description}
                        onChange={(event) => this.onInputChange(event)}
                    />
                    {gallery == null && <input type="file" multiple ref={this.filesInput} />}
                    <Button color="primary" onClick={() => this.submit()} >Valider</Button>
                    <Button onClick={() => this.cancel()} >Annuler</Button>
                </form>
            )
        }
    }
)

export default AdminGalleryForm