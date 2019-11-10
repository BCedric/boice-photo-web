import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { connect } from 'react-redux'

import './AdminGalleryForm.css'
import { postGallery } from "redux/admin-redux/actions";

const AdminGalleryForm = connect(
    state => ({}),
    dispatch => ({
        postGallery: (galleryId, body) => postGallery(galleryId, body)
    })
)(
    class extends React.Component {
        constructor(props) {
            super(props)
            const gallery = props.gallery
            this.state = { name: gallery.name, description: gallery.description != null ? gallery.description : '' }
        }

        componentDidUpdate(nextProps) {
            if (nextProps.gallery.id !== this.props.gallery.id) {
                const gallery = this.props.gallery
                this.setState({ name: gallery.name, description: gallery.description != null ? gallery.description : '' })
            }

        }

        onChangeName = (event) => {
            this.setState({ name: event.target.value })
        }

        onChangeDescription = (event) => {
            this.setState({ description: event.target.value })
        }

        submit() {
            this.props.postGallery(this.props.gallery.id, this.state)
        }

        render() {
            const { name, description } = this.state
            return (
                <form noValidate autoComplete="off">
                    <TextField
                        label="Nom"
                        multiline
                        variant="outlined"
                        value={name}
                        onChange={(event) => this.onChangeName(event)}
                    />
                    <TextField
                        label="Description"
                        multiline
                        variant="outlined"
                        value={description}
                        onChange={(event) => this.onChangeDescription(event)}
                    />
                    <Button color="primary" onClick={() => this.submit()} >Valider</Button>
                </form>
            )
        }
    }
)

export default AdminGalleryForm