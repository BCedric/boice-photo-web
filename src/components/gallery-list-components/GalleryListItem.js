import React from 'react'
import {
  Card,
  CardTitle
} from 'react-materialize'
import {
  Link
} from 'react-router-dom'
import config from 'config'

const GalleryListItem = ({id, name, randPicture}) => (
  <Card header={<Link to={'/gallery/' + id}><CardTitle image={config.adressServer+randPicture} waves='light'/></Link>}
      title={name}>
      <p><Link to={'/gallery/' + id}>Voir plus</Link></p>
  </Card>
)

export default GalleryListItem
