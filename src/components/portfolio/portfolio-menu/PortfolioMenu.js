import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from "react-router";
import { upperFirst } from 'lodash'

import { navGalleriesSelector } from 'redux/nav-redux/selectors'
import { fetchNavGalleries } from 'redux/nav-redux/actions'
import PortfolioMenuItem from './PortfolioMenuItem'

function PortfolioMenu(props) {
    const navGalleries = useSelector(navGalleriesSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        fetchNavGalleries()(dispatch)
    }, [dispatch])

    const matches = [
        useRouteMatch({
            path: '/portfolio/gallerieslist/:galleriesListId',
        }),
        useRouteMatch({
            path: '/portfolio/all',
            exact: true
        }),
        useRouteMatch({
            path: '/portfolio/gallery/:galleryId',
            exact: true
        })
    ]

    const mapGalleries = (galleriesLists, baseRoute) => {
        return galleriesLists.map(
            (list, index) => getNavItem({
                nameItem: upperFirst(list.name),
                route: `/portfolio/${baseRoute}/${list.id}`
            }, index))
    }

    const isNavItemActive = item =>
        matches.some(match =>
            match != null && match.url === item.route
        )


    const getNavItem = (item, index) => {
        return (
            <PortfolioMenuItem
                className={isNavItemActive(item) ? 'active' : ''}
                key={index}
                {...item}
            />
        )
    }

    return (

        <div className="default-navbar">
            {navGalleries != null &&
                <div className='navbar' position="static">
                    <div className='toolbar'>
                        {navGalleries != null && mapGalleries(navGalleries.galleriesLists, 'gallerieslist')}
                        {navGalleries != null && mapGalleries(navGalleries.galleries, 'gallery')}
                        {getNavItem({ nameItem: 'Toutes', route: '/portfolio/all' })}
                    </div>
                </div>
            }
        </div>
    )
}

export default PortfolioMenu