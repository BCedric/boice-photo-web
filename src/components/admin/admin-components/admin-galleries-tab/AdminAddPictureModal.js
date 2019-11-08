import React from 'react'
import Button from '@material-ui/core/Button'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Icon, Fab } from '@material-ui/core'
import { connect } from 'react-redux'

import { addPicture } from 'redux/admin-redux/actions'

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

        open = () => {
            this.setState({ isOpen: true })
        }

        render() {
            const { isFileSelected, isOpen } = this.state
            return (
                <div>
                    <Fab color="primary" onClick={() => this.open()} ><Icon >add</Icon></Fab>
                    <Dialog

                        open={isOpen}
                        onClose={() => this.cancel()}
                    >
                        <DialogTitle>Ajouter une photo</DialogTitle>
                        <DialogContent>
                            <div>
                                <form>
                                    <input type="file" ref={this.fileInput} onChange={() => this.fileChange()} ></input>
                                </form>
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button disabled={!isFileSelected} onClick={() => this.addPicture()}>Ajouter</Button>
                            <Button onClick={() => this.cancel()}>Annuler</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        }
    }
)

export default AdminAddPictureModal