import React from 'react'
import Helmet from 'react-helmet'
import {
    Route
} from 'react-router-dom'

import PortfolioMenu from './portfolio-menu/PortfolioMenu'
import Gallery from './gallery/Gallery'
import GalleriesList from './galleries-list/GalleriesList'

function Portfolio() {
    return (<div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Boïce Photo | Photos </title>
        </Helmet>
        <PortfolioMenu />
        <Route exact path='/portfolio' component={Gallery} />
        <Route path='/portfolio/gallery/:galleryId' component={Gallery} />
        <Route exact path='/portfolio/gallerieslist/:galleriesList' component={GalleriesList} />
        <Route path='/portfolio/gallerieslist/:galleriesListId/gallery/:galleryId' component={Gallery} />

    </div>)
}

export default Portfolio