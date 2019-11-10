import { connect } from 'react-redux'
import React from 'react'
import Helmet from 'react-helmet'
import { upperFirst } from 'lodash'

import {
  isFetchingSelector,
  galleriesListSelector
} from 'redux/galleries-list-redux/selectors'
import {
  fetchGalleriesList,
} from 'redux/galleries-list-redux/actions'

import GalleryListItem from './gallery-list-components/GalleryListItem'

import './GalleriesList.css'

const GalleriesList = connect(
  state => ({
    galleriesList: galleriesListSelector(state),
    isFetching: isFetchingSelector(state)
  }),
  dispatch => ({
    fetchGalleriesList: id => fetchGalleriesList(id)(dispatch),
  })
)(
  class extends React.Component {

    componentDidMount() {
      this.props.fetchGalleriesList(this.props.match.params.galleriesList)
    }

    componentDidUpdate(nextProps) {
      const nextGalleryListId = nextProps.match.params.galleriesList
      const currentGalleryListId = this.props.match.params.galleriesList
      if (nextGalleryListId !== currentGalleryListId) {
        this.props.fetchGalleriesList(this.props.match.params.galleriesList)
      }
    }

    displayList() {
      const { galleriesList } = this.props
      return !this.props.isFetching && galleriesList &&
        this.props.match.params.galleriesList === galleriesList.id.toString()
    }

    render() {
      const { galleriesList } = this.props
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
              <div className="gallery-list-container">
                {galleriesList.galleries.map(
                  gallery => <GalleryListItem {...gallery} />
                )}
              </div>
            </div>}

        </div>
      )
    }
  }
)

export default GalleriesList
