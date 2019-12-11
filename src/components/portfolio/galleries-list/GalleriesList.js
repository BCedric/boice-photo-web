import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { upperFirst } from 'lodash'

import {
  isFetchingSelector,
  galleriesListSelector
} from 'redux/galleries-list-redux/selectors'
import {
  fetchGalleriesList, setGalleriesListObject,
} from 'redux/galleries-list-redux/actions'

import GalleryListItem from './gallery-list-components/GalleryListItem'

const GalleriesList = connect(
  state => ({
    galleriesList: galleriesListSelector(state),
    isFetching: isFetchingSelector(state)
  }),
  dispatch => ({
    fetchGalleriesList: id => fetchGalleriesList(id)(dispatch),
    setGalleriesListObject: (object) => dispatch(setGalleriesListObject(object))
  })
)(
  function ({ galleriesList, match, fetchGalleriesList, setGalleriesListObject }) {
    useEffect(() => {
      fetchGalleriesList(match.params.galleriesList)
      return () => setGalleriesListObject(null)
    }, [match.params.galleriesList, fetchGalleriesList, setGalleriesListObject])

    return (
      <div className="galleries-list">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Boïce Photo | ${galleriesList && galleriesList.name}`} </title>
          <meta name="description" content={`Boïce Photo, ${galleriesList && galleriesList.name}`} />
        </Helmet>
        {galleriesList != null &&
          <div>
            <h1>
              {upperFirst(galleriesList.name)}
            </h1>
            <p>{galleriesList.description}</p>
            <div className='centered-h'>
              {galleriesList.galleries.map(
                (gallery, index) => <GalleryListItem {...gallery} galleriesListId={galleriesList.id} key={index} />
              )}
            </div>
          </div>}

      </div>
    )
  }
)

export default GalleriesList
