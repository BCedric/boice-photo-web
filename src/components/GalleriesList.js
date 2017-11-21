import { connect } from 'react-redux'
import React from 'react'
import { map, upperFirst } from 'lodash'

import {
  isFetchingSelector,
  galleriesListSelector
} from 'galleries-list-redux/selectors'
import {
  fetchGalleriesList,
  razList
} from 'galleries-list-redux/actions'
import GalleryListItem from './gallery-list-components/GalleryListItem'
import './styles/GalleriesList.css'

const GalleriesList = connect(
  state => ({
    galleriesList: galleriesListSelector(state),
    isFetching: isFetchingSelector(state)
  }),
  dispatch => ({
    fetchGalleriesList: id => fetchGalleriesList(id)(dispatch),
    razList: () => dispatch(razList())
  })
)(
  class extends React.Component {
    componentWillMount() {
      this.props.fetchGalleriesList(this.props.match.params.galleriesList)
      this.forceUpdate()
    }

    shouldComponentUpdate(){
      return !this.props.isFetching
    }

    componentWillUpdate (nextProps) {
      const {galleriesList, fetchGalleriesList, match } = nextProps
      if(this.props.match.params.galleriesList !== match.params.galleriesList
        || galleriesList === undefined
      ) {
        this.props.razList()
        fetchGalleriesList(match.params.galleriesList)
      }
    }

    componentWillUnmount() {
      this.props.razList()
     }

    render () {
      const { galleriesList } = this.props
      return (
        <div>
          {galleriesList && <h1>{upperFirst(galleriesList.name)}</h1>}
          {galleriesList && <p>{galleriesList.description}</p>}
          { galleriesList !== undefined && map(galleriesList.galleries,
            gallery => <GalleryListItem {...gallery} />
          )}
        </div>
      )
    }
  }
)

export default GalleriesList
