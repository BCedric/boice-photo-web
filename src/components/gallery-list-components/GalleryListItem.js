import React from 'react'
import {
  Card,
  CardTitle
} from 'react-materialize'
import {
  Link
} from 'react-router-dom'
import config from 'config'

class GalleryListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, picture: null }
  }

  render() {
    const { id, name, randPicture } = this.props
    return (
      <a>
        {
          <Card
            title={name}
            header={
              <Link to={`/gallery/${id}`}>
                {this.state.loading &&
                  <CardTitle
                    onLoad={() => this.setState({ loading: true })}
                    onLoaded={() => this.setState({ loading: false })}
                    image={`${config.adressServer}${randPicture}`}
                    waves='light' />
                }
              </Link>
            }
          >
            <p><Link to={'/gallery/' + id}>Voir plus</Link></p>
          </Card>
        }
      </a>

    )
  }
}

export default GalleryListItem
