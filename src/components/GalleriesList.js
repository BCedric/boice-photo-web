import { connect } from 'react-redux'
import React from 'react'
import { map } from 'lodash'
import config from 'config'
import {
  Link
} from 'react-router-dom'
import {
  Card,
  CardTitle
} from 'react-materialize'

import {
  isFetchingSelector,
  galleriesListSelector
} from 'galleries-list-redux/selectors'
import {
  fetchGalleriesList,
  razList
} from 'galleries-list-redux/actions'
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
      // console.log('componentWillMount', this.props);
      this.props.fetchGalleriesList(this.props.match.params.galleriesList)
    }

    componentWillUpdate (nextProps) {
      console.log('componentWillUpdate GalleriesList');
      const {galleriesList, fetchGalleriesList, match } = nextProps
      if(this.props.match.params.galleriesList !== match.params.galleriesList
        || galleriesList === undefined
      )
        fetchGalleriesList(match.params.galleriesList)
    }

    componentWillUnmount() {
      this.props.razList()
     }

    render () {
      // console.log(this.props);
      const { galleriesList } = this.props
      return (
        <div>
          {galleriesList && <h1>{galleriesList.name}</h1>}
          {galleriesList && <p>{galleriesList.description}</p>}
          { galleriesList !== undefined
            ? map(galleriesList.galleries, gallery =>
              (<Card header={<Link to={'/gallery/' + gallery.id}><CardTitle image={config.adressServer+gallery.randPicture} waves='light'/></Link>}
              		title={gallery.name}>
              		<p><Link to={'/gallery/' + gallery.id}>Voir plus</Link></p>
              </Card>)
            )
            : null}
        </div>)
    }
  }
)

export default GalleriesList
