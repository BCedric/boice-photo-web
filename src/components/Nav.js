import React from 'react'
import {
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { map, upperFirst, remove, findIndex } from 'lodash'
import { connect } from 'react-redux'
import { Navbar, NavItem, Icon } from 'react-materialize'
import {
  fetchGalleries,
  fetchGalleriesLists,
  setCurrentGalleries,
  fetchGalleriesNotInLists,
  setGalleriesPage
} from 'nav-redux/actions'
import {
  galleriesSelector,
  galleriesListsSelector,
  galleriesNotInListsSelector,
  currentGalleriesSelector,
  currentGallerySelector,
  galleriesPageSelector
} from 'nav-redux/selectors'
import { withRouter } from 'react-router'
import utils from 'utils'
import './styles/Nav.css'

import logo from './styles/img/logo.png'

const galleriesNumToDisplay = 3

const items = [
  {
    nameItem: 'Accueil',
    route: '/'
  },
  {
    nameItem: 'Gallery',
    route: '/gallery'
  },
  {
    nameItem: 'Admin',
    route:'/admin'
  }
]

const Nav = connect(
  state => {
    return {
      galleries: galleriesSelector(state),
      galleriesLists: galleriesListsSelector(state),
      currentGalleries: currentGalleriesSelector(state),
      currentGallery: currentGallerySelector(state),
      galleriesNotInLists: galleriesNotInListsSelector(state),
      galleriesPage: galleriesPageSelector(state)
    }
  },
  dispatch => ({
      fetchGalleries: () => fetchGalleries()(dispatch),
      fetchGalleriesLists: () => fetchGalleriesLists()(dispatch),
      setCurrentGalleries: galleries => dispatch(setCurrentGalleries(galleries)),
      fetchGalleriesNotInLists: () => fetchGalleriesNotInLists()(dispatch),
      setGalleriesPage: (e, page) => {
        e.preventDefault();
        dispatch(setGalleriesPage(page))
      }
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
    var prevPathname = prevProps.location.pathname
    const prevGalleryId = utils.getIdFromPath(prevPathname)
    var pathname = this.props.location.pathname
    const galleryId = utils.getIdFromPath(pathname)
    if(this.props.galleriesLists && this.props.galleries && this.props.location.pathname.includes("/gallery/") &&
      (!this.props.currentGalleries || prevGalleryId !== galleryId)){
      var currentGallery = this.props.galleries.filter( gallery => gallery.id === galleryId)[0]
      var currentList = this.props.galleriesLists.filter( list => list.id === currentGallery.parent_id)[0]
      if( currentList !== undefined) this.props.setCurrentGalleries(this.props.galleries.filter( gallery => gallery.parent_id === currentList.id))
    } else if (!this.props.location.pathname.includes("/gallery/")
      && this.props.currentGalleries !== undefined) {
      this.props.setCurrentGalleries(undefined)
    }
  }


  getNavItems(item){
    if (this.props.location.pathname === item.route) {
      return (
      <NavItem className='active'>
        <Link to={item.route}>{item.nameItem}</Link>
      </NavItem>)
    }
    return (
    <NavItem >
      <Link to={item.route}>{item.nameItem}</Link>
    </NavItem>)
  }

  getNavItemsGalleries (gallery) {
    if (gallery.id === utils.getIdFromPath(this.props.location.pathname)) {
      return(
        <NavItem className='tab col active'>
          <Link to={`/gallery/${gallery.id}`}>{upperFirst(gallery.name)}</Link>
        </NavItem>
      )
    }
    return(
      <NavItem className='tab col' s={6}>
        <Link to={`/gallery/${gallery.id}`}>{upperFirst(gallery.name)}</Link>
      </NavItem>
    )
  }

  getGalleriesToDisplay(){
    return remove(map(this.props.currentGalleries, (gallerie, index) => {

      if(index >= (this.props.galleriesPage - 1) * galleriesNumToDisplay
        && index < this.props.galleriesPage * galleriesNumToDisplay) return gallerie
    }), gallerie => gallerie !==undefined)
  }

  displayRightArrow () {
    if(this.props.currentGalleries !== undefined) {
      const lastDisplayed = this.getGalleriesToDisplay()[this.getGalleriesToDisplay().length - 1]
      const lastDiplayedIndex = findIndex(this.props.currentGalleries, gallerie => lastDisplayed.id === gallerie.id)
      return this.props.currentGalleries[lastDiplayedIndex + 1 ] !== undefined
    }
    return false
  }

  displayLeftArrow () {
    if(this.props.currentGalleries !== undefined) {
      const firstDisplayed = this.getGalleriesToDisplay()[0]
      const firstDiplayedIndex = findIndex(this.props.currentGalleries, gallerie => firstDisplayed.id === gallerie.id)
      return this.props.currentGalleries[firstDiplayedIndex - 1 ] !== undefined
    }
    return false
  }

  render () {
    const {galleriesLists, galleriesNotInLists, location, currentGalleries, setGalleriesPage, galleriesPage } = this.props
    return (
      <div className='nav'>
        <div>
          <img className='logo' src={logo} alt='logo' />
          <Navbar className='navbar' left>
            { map(items, item => this.getNavItems(item)) }
            {
              galleriesLists
                && map(galleriesLists,
                  list => this.getNavItems({nameItem: upperFirst(list.name), route: '/gallerieslist/'+list.id}))
            }

              {
                galleriesNotInLists
                  && map(galleriesNotInLists, gallery => this.getNavItems({nameItem: upperFirst(gallery.name), route: '/gallery/'+gallery.id}))
              }
          </Navbar>
          { currentGalleries
            && galleriesNotInLists
            && !map(
              galleriesNotInLists,
              gallery => gallery.id).includes(utils.getIdFromPath(location.pathname))
            && <div className='galerie-nav tabs z-depth-1' brand='<Icon>navigate_before</Icon>' left>
              {this.displayLeftArrow() && <NavItem className='tab col arrow'><a onClick={(e) => setGalleriesPage(e, galleriesPage - 1)} ><Icon>navigate_before</Icon></a></NavItem>}
              {this.getGalleriesToDisplay().map(gallery => this.getNavItemsGalleries(gallery))
              }
              {this.displayRightArrow() && <NavItem className='tab col arrow'><a onClick={(e) => setGalleriesPage(e, galleriesPage + 1)} ><Icon>navigate_next</Icon></a></NavItem>}
            </div>
          }

        </div>
      </div>
    )
  }
})


export default withRouter(Nav)
