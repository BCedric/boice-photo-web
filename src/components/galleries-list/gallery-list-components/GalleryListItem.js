import React from 'react'
import { Card, CardMedia, CardContent, Link } from '@material-ui/core'

import config from 'config'
import { makeStyles } from '@material-ui/styles'

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

  const { id, name, randPicture } = props
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={`${config.adressServer}${randPicture}`}
        title="Test"
      />
      <CardContent>
        <span className={classes.title}>
          {name}
        </span>
        <p><Link to={'/gallery/' + id}>Voir plus</Link></p>
      </CardContent>

    </Card>
  )
}

export default GalleryListItem
