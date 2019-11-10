import React from 'react'
import { connect } from 'react-redux'
import { map, upperFirst, remove, findIndex } from 'lodash'
import { Icon } from '@material-ui/core'

import utils from 'utils/utils'
import {
  galleriesPageSelector
} from 'redux/nav-redux/selectors'
import {
  setGalleriesPage
} from 'redux/nav-redux/actions'


import NavItemComp from './NavItemComp'

const galleriesNumToDisplay = 4

const NavGalleries = connect(
  state => ({
    galleriesPage: galleriesPageSelector(state)
  }),
  dispatch => ({
    setGalleriesPage: (e, page) => {
      e.preventDefault();
      dispatch(setGalleriesPage(page))
    }
  })
)(
  class extends React.Component {

    constructor(props) {
      super(props);
      this.state = { open: false };
    };

    getGalleriesToDisplay() {
      return remove(map(this.props.currentGalleries, (gallerie, index) => {

        if (index >= (this.props.galleriesPage - 1) * galleriesNumToDisplay
          && index < this.props.galleriesPage * galleriesNumToDisplay) return gallerie
      }), gallerie => gallerie !== undefined)
    }

    displayLeftArrow() {
      if (this.props.currentGalleries !== undefined) {
        const firstDisplayed = this.getGalleriesToDisplay()[0]
        const firstDiplayedIndex = findIndex(this.props.currentGalleries, gallerie => firstDisplayed.id === gallerie.id)
        return this.props.currentGalleries[firstDiplayedIndex - 1] !== undefined
      }
      return false
    }

    displayRightArrow() {
      if (this.props.currentGalleries !== undefined) {
        const lastDisplayed = this.getGalleriesToDisplay()[this.getGalleriesToDisplay().length - 1]
        const lastDiplayedIndex = findIndex(this.props.currentGalleries, gallerie => lastDisplayed.id === gallerie.id)
        return this.props.currentGalleries[lastDiplayedIndex + 1] !== undefined
      }
      return false
    }

    getNavItemsGalleries = gallery => {
      return (
        <NavItemComp
          className={gallery.id === utils.getIdFromPath(this.props.location.pathname)
            ? 'tab col active'
            : 'tab col'}
          route={`/gallery/${gallery.id}`}
          nameItem={upperFirst(gallery.name)} />
      )
    }

    render() {
      const { setGalleriesPage, galleriesPage, className } = this.props
      return (
        <div className={`galerie-nav tabs z-depth-1 ${className}`}>
          {/* {this.displayLeftArrow() && <NavItem className='tab col arrow'><a onClick={(e) => setGalleriesPage(e, galleriesPage - 1)} ><Icon>navigate_before</Icon></a></NavItem>} */}
          {this.getGalleriesToDisplay().map(gallery => this.getNavItemsGalleries(gallery))}
          {/* {this.displayRightArrow() && <NavItem className='tab col arrow'><a onClick={(e) => {
            this.setState({ open: !this.state.open })
            setGalleriesPage(e, galleriesPage + 1)
          }} ><Icon>navigate_next</Icon></a></NavItem>} */}
        </div>

      )
    }
  }
)

export default NavGalleries
