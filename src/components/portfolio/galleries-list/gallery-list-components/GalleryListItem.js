import React from 'react'
import { Card, CardMedia, CardContent } from '@material-ui/core'

import config from 'config'
import MyLink from 'components/MyLink';

function GalleryListItem({
  id,
  name,
  galleryPreview,
  galleriesListId
}) {

  return (
    <Card className="gallery-card">
      <MyLink to={`/portfolio/gallerieslist/${galleriesListId}/gallery/${id}`}>
        <CardMedia
          className="gallery-picture"
          image={`${config.addressServer}${galleryPreview}`}
          title={name}
        />
      </MyLink>
      <CardContent>
        <span className="gallery-title">
          {name}
        </span>
        <p>
          <MyLink to={`/portfolio/gallerieslist/${galleriesListId}/gallery/${id}`}>
            Voir plus
          </MyLink>
        </p>
      </CardContent>

    </Card>
  )
}

export default GalleryListItem
