import React from 'react'
import { connect } from 'react-redux'

import { getGalleriesLists, setCurrentGalleriesList } from 'redux/admin-redux/actions'
import { galleriesListsSelector, currentGalleriesListSelector } from 'redux/admin-redux/selectors'
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
        setCurrentGalleriesList: galleriesList => dispatch(setCurrentGalleriesList(galleriesList))
    })
)(
    function (props) {
        const { galleriesLists, getGalleriesLists, currentGalleriesList, setCurrentGalleriesList } = props
        console.log('galleriesLists', galleriesLists);

        return (
            <SelectableEntitiesList
                entities={galleriesLists}
                displayEntity={galleriesLists => galleriesLists.name}
                setCurrentEntity={setCurrentGalleriesList}
                getEntities={getGalleriesLists}
                selectedEntity={currentGalleriesList}
                componentToDisplay={entity => <AdminGalleriesListGalleries />}
                entityForm={(closeForm, editedEntity) => <AdminGalleriesListForm galleriesList={editedEntity} closeForm={closeForm} />}
                deleteEntity={() => { }}
            >
                {currentGalleriesList != null && <div>
                    <AdminGalleriesListGalleries />
                </div>}
            </SelectableEntitiesList>
        )
    }
)

export default AdminGalleriesLists