import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch } from "react-router";
import { Toolbar, AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { upperFirst } from 'lodash'

import { navGalleriesSelector } from 'redux/nav-redux/selectors'
import { fetchNavGalleries } from 'redux/nav-redux/actions'
import PortfolioMenuItem from './PortfolioMenuItem'

const useStyles = makeStyles({
    toolbar: {
        alignItems: 'stretch'
    },
    defaultMenu: {
        minHeight: '64px'
    }
})

function PortfolioMenu(props) {
    const navGalleries = useSelector(navGalleriesSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        fetchNavGalleries()(dispatch)
    }, [dispatch])

    const { toolbar, defaultMenu } = useStyles()

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

        <div className={defaultMenu}>
            {navGalleries != null &&
                <AppBar className='navbar' position="static">
                    <Toolbar className={toolbar}>
                        {navGalleries != null && mapGalleries(navGalleries.galleriesLists, 'gallerieslist')}
                        {navGalleries != null && mapGalleries(navGalleries.galleries, 'gallery')}
                        {getNavItem({ nameItem: 'Toutes', route: '/portfolio/all' })}
                    </Toolbar>
                </AppBar>
            }
        </div>
    )
}

export default PortfolioMenu