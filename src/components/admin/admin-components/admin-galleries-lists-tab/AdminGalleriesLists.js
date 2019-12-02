import React from 'react'
import { connect } from 'react-redux'

import { getGalleriesLists, setCurrentGalleriesList, deleteGalleriesList } from 'redux/admin-redux/admin-galleries-list-redux/actions'
import { galleriesListsSelector, currentGalleriesListSelector } from 'redux/admin-redux/admin-galleries-list-redux/selectors'
import SelectableEntitiesList from 'components/SelectableEntitiesList'
import AdminGalleriesListGalleries from './AdminGalleriesListGalleries'
import AdminGalleriesListForm from './AdminGalleriesListForm'

const AdminGalleriesLists = connect(
    state => ({
        galleriesLists: galleriesListsSelector(state),
        currentGalleriesList: currentGalleriesListSelector(state)
    }),
    dispatch => ({
        getGalleriesLists: () => getGalleriesLists()(dispatch),
        setCurrentGalleriesList: galleriesList => dispatch(setCurrentGalleriesList(galleriesList)),
        deleteGalleriesList: id => deleteGalleriesList(id)(dispatch)
    })
)(
    function (props) {
        const { galleriesLists, getGalleriesLists, currentGalleriesList, setCurrentGalleriesList, deleteGalleriesList } = props
        return (
            <SelectableEntitiesList
                entities={galleriesLists}
                displayEntity={galleriesLists => galleriesLists.name}
                setCurrentEntity={setCurrentGalleriesList}
                getEntities={getGalleriesLists}
                selectedEntity={currentGalleriesList}
                componentToDisplay={() => <AdminGalleriesListGalleries />}
                entityForm={(closeForm, editedEntity) => <AdminGalleriesListForm galleriesList={editedEntity} closeForm={closeForm} />}
                deleteEntity={entity => deleteGalleriesList(entity.id)}
            >
                {currentGalleriesList != null && <div>
                    <AdminGalleriesListGalleries />
                </div>}
            </SelectableEntitiesList>
        )
    }
)

export default AdminGalleriesLists