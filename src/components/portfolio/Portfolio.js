import React from 'react'
import Helmet from 'react-helmet'
import {
    Route
} from 'react-router-dom'

import PortfolioHome from './PortfolioHome'
import PortfolioMenu from './portfolio-menu/PortfolioMenu'
import Gallery from './gallery/Gallery'
import GalleriesList from './galleries-list/GalleriesList'

function Portfolio() {
    return (
        <div className="portfolio">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Boïce Photo | Photos </title>
                <meta name="description" content="Boïce Photo, les photos" />
            </Helmet>
            <PortfolioMenu />
            <Route exact path='/portfolio' component={PortfolioHome} />
            <Route path='/portfolio/all' component={Gallery} />
            <Route path='/portfolio/gallery/:galleryId' component={Gallery} />
            <Route exact path='/portfolio/gallerieslist/:galleriesList' component={GalleriesList} />
            <Route path='/portfolio/gallerieslist/:galleriesListId/gallery/:galleryId' component={Gallery} />
        </div>)
}

export default Portfolio