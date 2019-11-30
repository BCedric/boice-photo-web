import React, { useEffect, useCallback } from 'react'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

import config from 'config'
import Slider from 'components/Slider/Slider'
import { carouselGalleriesSelector } from 'redux/home-redux/selectors'
import { getCarouselGalleries } from 'redux/home-redux/actions'

const useStyles = makeStyles({
  sliderContainer: {
    height: '100vh'
  }
})

export default function Home() {
  const dispatch = useDispatch()
  const fetchCarouselGalleries = useCallback(
    () => getCarouselGalleries()(dispatch),
    [dispatch]
  )
  const carouselPictures = useSelector(
    (state) => {
      const galleries = carouselGalleriesSelector(state)
      if (galleries != null) {
        return galleries.map(gallery => {
          const link = gallery.parentId === null
            ? `/portfolio/gallery/${gallery.id}`
            : `/portfolio/gallerieslist/${gallery.parentId}/gallery/${gallery.id}`

          return {
            src: `${config.addressServer}${gallery.galleryPreview}`,
            name: gallery.name,
            link
          }

        })
      }
      return null
    })

  const { sliderContainer } = useStyles()

  useEffect(() => {
    fetchCarouselGalleries()
  }, [fetchCarouselGalleries])


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Boïce Photo | Accueil </title>
      </Helmet>
      {carouselPictures != null &&
        <div className={sliderContainer}>
          <Slider pictures={carouselPictures} />
        </div>}
    </div >
  )
}
