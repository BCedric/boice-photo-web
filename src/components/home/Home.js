import React, { useEffect, useCallback } from 'react'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'

import config from 'config'
import Slider from 'components/Slider/Slider'
import { carouselGalleriesSelector } from 'redux/home-redux/selectors'
import { getCarouselGalleries } from 'redux/home-redux/actions'

import './Home.css'

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
        return galleries.map(gallery => ({
          src: `${config.adressServer}${gallery.galleryPreview}`,
          name: gallery.name,
          link: `/gallery/${gallery.id}`
        }))
      }
      return null
    })

  useEffect(() => {
    fetchCarouselGalleries()
  }, [fetchCarouselGalleries])


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Boïce Photo | Accueil </title>
      </Helmet>
      <h1>Accueil</h1>
      {carouselPictures != null &&
        <div className="slider-container">
          <Slider pictures={carouselPictures} />
        </div>}
      <div className="accueil-content">
        <p>
          Morbi condimentum augue ut venenatis molestie. Mauris fermentum nibh consectetur justo tincidunt, eget mattis est aliquet. Morbi ut justo in odio consectetur maximus. Proin sollicitudin ut augue eget dapibus. In et ex molestie, convallis erat eget, posuere est. Fusce nec tempor lectus. Vivamus vulputate eu tellus et convallis. Nulla accumsan fringilla porttitor. Curabitur tristique felis eu sapien laoreet, a imperdiet magna fringilla. Donec sed lectus at mi auctor tincidunt sed viverra ante. Sed in eros eu orci egestas sodales. Vestibulum tortor erat, molestie placerat euismod sodales, aliquam nec orci. Pellentesque id facilisis ipsum.
        </p>
        <p>
          Donec vitae eleifend nulla. Praesent neque dui, pretium eget eros nec, tincidunt tincidunt massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed in tincidunt lorem. Suspendisse ultrices mattis aliquet. Quisque pretium, dui et pellentesque blandit, odio odio feugiat risus, non tincidunt turpis augue quis ex. Sed vel felis nibh. Nunc tincidunt nunc sit amet tellus dapibus rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
        <p>
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer scelerisque hendrerit diam eget sagittis. Mauris ut luctus purus. Nulla a convallis turpis. Fusce elementum efficitur massa id pulvinar. Aliquam pellentesque hendrerit dui, et volutpat quam interdum id. Praesent sit amet mauris ac purus sagittis vulputate eget laoreet lacus. Praesent ullamcorper tincidunt mi, id maximus nunc congue et. Donec non risus in magna vehicula tristique ac in nibh. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam sagittis at augue ut eleifend. Duis nec lorem mi.
        </p>
      </div>
    </div >
  )
}
