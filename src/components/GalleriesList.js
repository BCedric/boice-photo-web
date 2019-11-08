import { connect } from 'react-redux'
import React from 'react'
import Helmet from 'react-helmet'
import { map, upperFirst } from 'lodash'

import {
  isFetchingSelector,
  galleriesListSelector
} from 'redux/galleries-list-redux/selectors'
import {
  fetchGalleriesList,
} from 'redux/galleries-list-redux/actions'
import GalleryListItem from './gallery-list-components/GalleryListItem'
import './styles/GalleriesList.css'
import FadeComponent from 'components/fade-component'
import { Preloader } from 'react-materialize'

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

    constructor(props) {
      super(props)
    }

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
      const { galleriesList, isFetching } = this.props
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`Boïce Photo | ${galleriesList && galleriesList.name}`} </title>
          </Helmet>
          {/* {
            <FadeComponent display={!isFetching}> */}
          {galleriesList != null &&
            <div>
              {<h1>{upperFirst(galleriesList.name)}</h1>}
              {<p>{galleriesList.description}</p>}
              {galleriesList.galleries.map(
                gallery => <GalleryListItem {...gallery} />
              )}
            </div>}
          {isFetching && <Preloader />}
          {/* </FadeComponent>

          } */}
        </div>
      )
    }
  }
)

export default GalleriesList
