import React from 'react'
import {
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { map, upperFirst } from 'lodash'
import { connect } from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'
import {
  fetchGalleries,
  fetchGalleriesLists,
  setCurrentGalleries,
  fetchGalleriesNotInLists
} from 'nav-redux/actions'
import {
  galleriesSelector,
  galleriesListsSelector,
  galleriesNotInListsSelector,
  currentGalleriesSelector,
  currentGallerieSelector
} from 'nav-redux/selectors'
import { withRouter } from 'react-router'
import utils from 'utils'
import './styles/Nav.css'

import logo from './styles/img/logo.png'

const items = [
  {
    nameItem: 'Accueil',
    route: '/'
  },
  {
    nameItem: 'UploadImage',
    route: '/uploadimage'
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
      currentGallerie: currentGallerieSelector(state),
      galleriesNotInLists: galleriesNotInListsSelector(state)
    }
  },
  dispatch => ({
      fetchGalleries: () => fetchGalleries()(dispatch),
      fetchGalleriesLists: () => fetchGalleriesLists()(dispatch),
      setCurrentGalleries: galleries => dispatch(setCurrentGalleries(galleries)),
      fetchGalleriesNotInLists: () => fetchGalleriesNotInLists()(dispatch),
  })
)(class extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
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
      var currentGallery = this.props.galleries.toJS().filter( gallery => gallery.id === galleryId)[0]
      var currentList = this.props.galleriesLists.toJS().filter( list => list.id === currentGallery.parent_id)[0]
      if( currentList !== undefined) this.props.setCurrentGalleries(this.props.galleries.toJS().filter( gallery => gallery.parent_id === currentList.id))
    } else if (!this.props.location.pathname.includes("/gallery/")) {
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
      <NavItem className='tab col'>
        <Link to={`/gallery/${gallery.id}`}>{upperFirst(gallery.name)}</Link>
      </NavItem>
    )

  }

  render () {
    // console.log(this.props);
    // console.log(map(items, item => this.getNavItems(item)));
    return (
      <div className='nav'>
        <div>
          <img className='logo' src={logo} alt='logo' />
          <Navbar className='navbar' left>
            { map(items, item => this.getNavItems(item)) }
            {
              this.props.galleriesLists
                && map(this.props.galleriesLists.toJS(),
                  list => this.getNavItems({nameItem: upperFirst(list.name), route: '/gallerieslist/'+list.id}))
            }

              {
                this.props.galleriesNotInLists
                  && map(this.props.galleriesNotInLists.toJS(), gallery => this.getNavItems({nameItem: upperFirst(gallery.name), route: '/gallery/'+gallery.id}))
              }
          </Navbar>
          { this.props.currentGalleries
            && this.props.galleriesNotInLists
            && !map(
              this.props.galleriesNotInLists.toJS(),
              gallery => gallery.id).includes(utils.getIdFromPath(this.props.location.pathname))
            && <Navbar className='galerie-nav tabs z-depth-1'>
              {map(this.props.currentGalleries.toJS(), gallery => this.getNavItemsGalleries(gallery)

              )}
            </Navbar>
          }

        </div>
      </div>
    )
  }
})


export default withRouter(Nav)
