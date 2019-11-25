import React from 'react'
import { Card, CardMedia, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import config from 'config'
import MyLink from 'components/MyLink';

const useStyles = makeStyles({
  card: {
    width: '27em',
    margin: '0.5em'
  },
  media: {
    height: '17em',
  },
  title: {
    fontSize: '1.5em'
  }
});

function GalleryListItem(props) {
  const classes = useStyles();

  const { id, name, galleryPreview } = props
  return (
    <Card className={classes.card}>
      <MyLink to={'/gallery/' + id}>
        <CardMedia
          className={classes.media}
          image={`${config.adressServer}${galleryPreview}`}
          title={name}
        />
      </MyLink>
      <CardContent>
        <span className={classes.title}>
          {name}
        </span>
        <p>
          <MyLink to={'/gallery/' + id}>
            Voir plus
          </MyLink>
        </p>
      </CardContent>

    </Card>
  )
}

export default GalleryListItem
