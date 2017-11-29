import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { connect } from 'react-redux'
import {
  fetchGalleries,
  fetchGalleriesLists,
  setCurrentGalleries,
  fetchGalleriesNotInLists,
} from 'nav-redux/actions'
import {
  galleriesSelector,
  galleriesListsSelector,
  galleriesNotInListsSelector,
  currentGalleriesSelector,
  currentGallerySelector
} from 'nav-redux/selectors'
import { withRouter } from 'react-router'
import utils from 'utils'


import './styles/Nav.css'
import logo from './styles/img/logo.png'
import NavBarGalleries from './nav-components/NavBarGalleries'
import NavBarComp from './nav-components/NavBarComp'

const Nav = connect(
  state => {
    return {
      galleries: galleriesSelector(state),
      galleriesLists: galleriesListsSelector(state),
      currentGalleries: currentGalleriesSelector(state),
      currentGallery: currentGallerySelector(state),
      galleriesNotInLists: galleriesNotInListsSelector(state)
    }
  },
  dispatch => ({
      fetchGalleries: () => fetchGalleries()(dispatch),
      fetchGalleriesLists: () => fetchGalleriesLists()(dispatch),
      setCurrentGalleries: galleries => dispatch(setCurrentGalleries(galleries)),
      fetchGalleriesNotInLists: () => fetchGalleriesNotInLists()(dispatch)
  })
)(class extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount(){
    this.props.fetchGalleries()
    this.props.fetchGalleriesLists()
    this.props.fetchGalleriesNotInLists()
  }

  componentDidUpdate (prevProps) {
    const {galleries, galleriesLists, location, currentGalleries, setCurrentGalleries} = this.props
    const prevGalleryId = utils.getIdFromPath(prevProps.location.pathname)
    const galleryId = utils.getIdFromPath(location.pathname)

    if(galleriesLists
      && galleries
      && location.pathname.includes("/gallery/")
      && (!currentGalleries
          || prevGalleryId !== galleryId)){
      const currentGallery = galleries.filter( gallery => gallery.id === galleryId)[0]
      if( currentGallery !== undefined)var currentList = galleriesLists.filter( list => list.id === currentGallery.parent_id)[0]
      if( currentList !== undefined) setCurrentGalleries(galleries.filter( gallery => gallery.parent_id === currentList.id))
    } else if (!location.pathname.includes("/gallery/")
      && currentGalleries !== undefined) {
      setCurrentGalleries(undefined)
    }
  }

  render () {
    const { galleriesNotInLists, location, currentGalleries } = this.props
    return (
      <div className='nav'>
        <div>
          <div className='header'>
            <img className='logo' src={logo} alt='logo' />
          </div>
          <NavBarComp {...this.props }/>
          { currentGalleries
            && galleriesNotInLists
            && !map(
              galleriesNotInLists,
              gallery => gallery.id).includes(utils.getIdFromPath(location.pathname))
            && <NavBarGalleries {...this.props} className='fade'/>
          }
        </div>
      </div>
    )
  }
})


export default withRouter(Nav)
