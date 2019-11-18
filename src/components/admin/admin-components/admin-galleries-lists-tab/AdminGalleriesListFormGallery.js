import React from 'react'
import { TextField } from '@material-ui/core'
import Icon from 'components/Icon'

class AdminGalleriesListFormGallery extends React.Component {

    constructor(props) {
        super(props)
        this.filesInput = React.createRef()
    }

    onInputChange = (event) => {
        const name = event.target.name
        const value = name === 'name'
            ? event.target.value
            : this.filesInput.current.files

        this.props.onInputChange(this.props.index, { [name]: value })
    }

    onDelete = () => this.props.onDelete(this.props.index)

    render() {
        return (
            <div>
                <TextField
                    label="Nom"
                    name="name"
                    multiline
                    variant="outlined"
                    value={this.props.values.name}
                    onChange={(event) => this.onInputChange(event)}
                />
                <input type="file" name="files" onChange={(event) => this.onInputChange(event)
                } multiple ref={this.filesInput} />
                <Icon color="error" onClick={() => this.onDelete()} >delete</Icon>
            </div>
        )
    }
}

export default AdminGalleriesListFormGallery