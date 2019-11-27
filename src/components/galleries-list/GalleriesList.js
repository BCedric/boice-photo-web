import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { upperFirst } from 'lodash'
import { makeStyles } from '@material-ui/styles'

import {
  isFetchingSelector,
  galleriesListSelector
} from 'redux/galleries-list-redux/selectors'
import {
  fetchGalleriesList, setGalleriesListObject,
} from 'redux/galleries-list-redux/actions'

import GalleryListItem from './gallery-list-components/GalleryListItem'

const useStyles = makeStyles({
  galleryListContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
})

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
    }, [match.params.galleriesList])
    const { galleryListContainer } = useStyles()

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Boïce Photo | ${galleriesList && galleriesList.name}`} </title>
        </Helmet>
        {galleriesList != null &&
          <div>
            <h1>
              {upperFirst(galleriesList.name)}
            </h1>
            <p>{galleriesList.description}</p>
            <div className={galleryListContainer}>
              {galleriesList.galleries.map(
                (gallery, index) => <GalleryListItem {...gallery} key={index} />
              )}
            </div>
          </div>}

      </div>
    )
  }
)

export default GalleriesList
