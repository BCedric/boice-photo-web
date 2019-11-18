import React from 'react'
import { Icon, Fab } from '@material-ui/core';
import { connect } from 'react-redux'

import { addPicture } from 'redux/admin-redux/actions'
import Modal from 'components/Modal';

const AdminAddPictureModal = connect(
    state => ({}),
    dispatch => ({
        addPicture: (galleryId, file) => addPicture(galleryId, file)(dispatch)
    })
)(

    class extends React.Component {
        constructor(props) {
            super(props)
            this.state = { isOpen: false }
            this.fileInput = React.createRef()
        }

        cancel = () => {
            this.setState({ isOpen: false, isFileSelected: false })
        }

        addPicture = () => {
            this.props.addPicture(this.props.galleryId, this.fileInput.current.files[0])
                .then(_ => this.cancel())
        }

        fileChange = () => {
            this.setState({ isFileSelected: this.fileInput.current != null })
        }

        getButtonToOpenModal = (open) =>
            <Fab color="primary" onClick={() => open()} ><Icon >add</Icon></Fab>

        render() {
            const { isFileSelected, } = this.state
            return (
                <Modal
                    title="Ajouter une photo"
                    onValidate={() => this.addPicture()}
                    getButton={this.getButtonToOpenModal}
                >
                    <div>
                        <form>
                            <input type="file" ref={this.fileInput} onChange={() => this.fileChange()} ></input>
                        </form>
                    </div>
                </Modal>
            )
        }
    }
)

export default AdminAddPictureModal