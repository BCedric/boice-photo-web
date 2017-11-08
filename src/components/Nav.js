import React from 'react'
import {
  Link
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { forEach, map, upperFirst } from 'lodash'
import { connect } from 'react-redux'
import { Navbar, NavItem, Dropdown, Button, Tab, Tabs } from 'react-materialize'
import { fetchGalleries, fetchGalleriesLists, setCurrentGalleries } from 'nav-redux/actions'
import { galleriesSelector, galleriesListsSelector, currentGalleriesSelector } from 'nav-redux/selectors'
import { withRouter } from 'react-router'
import utils from 'utils'
import './styles/Nav.css'

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
  }
]

const Nav = connect(
  state => {
    return {
      galleries: galleriesSelector(state),
      galleriesLists: galleriesListsSelector(state),
      currentGalleries: currentGalleriesSelector(state)
    }
  },
  dispatch => ({
      fetchGalleries: () => fetchGalleries()(dispatch),
      fetchGalleriesLists: () => fetchGalleriesLists()(dispatch),
      setCurrentGalleries: galleries => dispatch(setCurrentGalleries(galleries))
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
  }

  componentDidUpdate (prevProps) {
    var prevPathname = prevProps.location.pathname
    const prevGalleryId = utils.getIdFromPath(prevPathname)
    var pathname = this.props.location.pathname
    const galleryId = utils.getIdFromPath(pathname)
    console.log(prevProps.location.pathname.includes("/gallery/"));
    if(this.props.galleriesLists && this.props.galleries && this.props.location.pathname.includes("/gallery/") &&
      (!this.props.currentGalleries || prevGalleryId !== galleryId)){
      var currentGallery = this.props.galleries.toJS().filter( gallery => gallery.id === galleryId)[0]
      var currentList = this.props.galleriesLists.toJS().filter( list => list.id === currentGallery.parent_id)[0]
      this.props.setCurrentGalleries(this.props.galleries.toJS().filter( gallery => gallery.parent_id === currentList.id))
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

    console.log(this.props);
    if(this.props.currentGalleries) console.log('currentGalleries', this.props.currentGalleries.toJS());
    return (
      <div className='nav'>
        <div>

          <Navbar className='navbar' brand='logo' left>
          { map(items, item => this.getNavItems(item)) }
            {this.props.galleriesLists !== undefined
              ? map(map(this.props.galleriesLists.toJS(), list => ({nameItem: upperFirst(list.name), route: '/gallerieslist/'+list.id})), list => this.getNavItems(list))
              : null
            }
            <Dropdown options={{belowOrigin: true, hover: true}} trigger={
            		<Button className='dropdown-button'><a>Gallerie</a></Button>
            	}>
              {this.props.galleries !== undefined
                ? map(this.props.galleries.toJS(), gallery => <NavItem className='dropbox-item' ><Link to={`/gallery/${gallery.id}`}>{upperFirst(gallery.name)}</Link></NavItem>)
                : null
              }
            </Dropdown>
          </Navbar>

          { this.props.currentGalleries &&

            <Navbar className='galerie-nav tabs z-depth-1'>
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
