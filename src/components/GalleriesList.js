import { connect } from 'react-redux'
import React from 'react'
import Helmet from 'react-helmet'
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
import FadeComponent from 'fade-component'

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

    constructor (props) {
        super(props)
        this.state = {display: false, loading: true}
    }

    componentWillMount() {
      this.props.fetchGalleriesList(this.props.match.params.galleriesList)
      this.forceUpdate()
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

     displayList() {
       const { galleriesList } = this.props
       return !this.props.isFetching && galleriesList &&
         this.props.match.params.galleriesList === galleriesList.id.toString()
     }

    render () {
      const { galleriesList } = this.props
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`Boïce Photo | ${galleriesList && galleriesList.name}`} </title>
          </Helmet>
          <FadeComponent onLoad={() => this.setState({loading: true})}  onLoaded= {() => this.setState({loading: false})} display={this.displayList()} onCompositionStart={() => console.log('onCompositionStart')}>
            {galleriesList && <h1>{upperFirst(galleriesList.name)}</h1>}
            {galleriesList && <p>{galleriesList.description}</p>}
            { galleriesList !== undefined && map(galleriesList.galleries,
              gallery => <GalleryListItem {...gallery} />
            )}
          </FadeComponent>
        </div>
      )
    }
  }
)

export default GalleriesList
