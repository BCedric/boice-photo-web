import React from 'react'
import { useSelector } from 'react-redux'

import { navGalleriesSelector } from 'redux/nav-redux/selectors'
import config from 'config'
import PortfolioHomeItems from './PortfolioHomeItems'


function PortfolioHome() {
    const navGalleries = useSelector(navGalleriesSelector)

    const galleries = navGalleries == null
        ? []
        : [...navGalleries.galleriesLists.map(galleriesList => ({
            link: `/portfolio/gallerieslist/${galleriesList.id}`,
            src: `${config.addressServer}/picture/${galleriesList.picture.id}`,
            ...galleriesList,
            width: galleriesList.picture.width,
            height: galleriesList.picture.height
        })),
        ...navGalleries.galleries.map(gallery => ({
            link: `/portfolio/gallery/${gallery.id}`,
            src: `${config.addressServer}/picture/${gallery.picture.id}`,
            ...gallery,
            width: gallery.picture.width,
            height: gallery.picture.height
        }))
        ]

    return (
        <div >
            <h1>Photos</h1>
            {galleries.length > 0 && <PortfolioHomeItems galleries={galleries} />}
        </div>
    )
}

export default PortfolioHome