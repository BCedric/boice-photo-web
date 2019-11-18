import React from 'react'
import { TextField, Button } from '@material-ui/core'
import AdminGalleriesListFormGallery from './AdminGalleriesListFormGallery'
import { connect } from 'react-redux'

import './AdminGalleriesListForm.css'
import Icon from 'components/Icon'
import { postGalleriesList, putGalleriesList } from 'redux/admin-redux/actions'

const AdminGalleriesListForm = connect(
    state => ({}),
    dispatch => ({
        postGalleriesList: (galleriesList) => postGalleriesList(galleriesList)(dispatch),
        putGalleriesList: (id, body) => putGalleriesList(id, body)(dispatch)
    })
)(
    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = { name: this.initProperty(props.galleriesList, 'name'), galleriesForms: [] }
            this.formRef = React.createRef()
        }

        initProperty(galleriesList, property) {
            return galleriesList != null && galleriesList[property] != null
                ? galleriesList[property]
                : ''
        }

        handleGalleriesListHasChange(prevProps) {
            return prevProps.galleriesList !== this.props.galleriesList
        }

        componentDidUpdate(prevProps) {
            if (this.handleGalleriesListHasChange(prevProps)) {
                const { galleriesList } = this.props
                if (galleriesList != null) {
                    this.setState({ name: galleriesList.name })
                } else {
                    this.setState({ name: '' })
                }
            }
        }

        onInputChange = (event) => {
            const { name, value } = event.target
            this.setState({ [name]: value })
        }

        submit = () => {
            const { galleriesList } = this.props
            galleriesList == null
                ? this.props.postGalleriesList(this.state)
                    .then(response => response.err == null && this.props.closeForm())
                : this.props.putGalleriesList(galleriesList.id, this.state)
                    .then(response => response.err == null && this.props.closeForm())
        }

        addGallerie = () => {
            const { galleriesForms } = this.state
            galleriesForms.push({ name: '', files: [] })
            this.setState({ galleriesForms })
        }

        setGalleryValues = (index, values) => {
            const galleryValues = this.state.galleriesForms.slice(0)
            galleryValues[index] = { ...galleryValues[index], ...values }
            this.setState({ galleriesForms: galleryValues })
        }

        deleteGalleryValues = (index) => {
            const galleryValues = this.state.galleriesForms.slice(0)
            galleryValues.splice(index, 1)
            this.setState({ galleriesForms: galleryValues })
        }

        render() {
            const { galleriesList } = this.props
            return (
                <form id="galleries-list-form">
                    <div className="galleries-list-fields">
                        <TextField
                            label="Nom"
                            name="name"
                            multiline
                            variant="outlined"
                            value={this.state.name}
                            onChange={(event) => this.onInputChange(event)}
                        />
                        {galleriesList == null && <Icon className="clickable" onClick={() => this.addGallerie()} >add</Icon>}
                    </div>
                    {this.state.galleriesForms.map((galleryForm, index) =>
                        <div className="gallery-form" key={index}>
                            <AdminGalleriesListFormGallery
                                index={index}
                                values={galleryForm}
                                onInputChange={(index, values) => this.setGalleryValues(index, values)}
                                onDelete={(index) => this.deleteGalleryValues(index)}
                            />
                        </div>)}
                    <div className="buttons-action">
                        <Button color="primary" onClick={() => this.submit()} >Valider</Button>
                        <Button onClick={() => this.props.closeForm()} >Annuler</Button>
                    </div>
                </form>
            )
        }

    }
)

export default AdminGalleriesListForm 