import React from 'react'
import { withStyles } from '@material-ui/styles'
import PortfolioHomeItem from './PortfolioHomeItem'
import { CircularProgress } from '@material-ui/core'

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '1em'
    }
}

class PortfolioHomeItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = { imgsLoaded: [...Array(props.galleries.length)].map(_ => false) }
    }

    imgLoaded = (index) => {
        const { imgsLoaded } = this.state
        const imgsLoadedTemp = [...imgsLoaded]
        imgsLoadedTemp[index] = true
        this.setState({ imgsLoaded: imgsLoadedTemp })
    }

    everyImgsLoaded = () => {
        const { imgsLoaded } = this.state

        return imgsLoaded.every(loaded => loaded === true)
    }

    render() {
        const { classes, galleries } = this.props
        return (
            <div>
                {
                    !this.everyImgsLoaded() &&
                    <div className="loader-container" >
                        <CircularProgress />
                    </div>
                }
                <div className={classes.container} style={{ visibility: this.everyImgsLoaded() ? 'visible' : 'hidden' }}>
                    {galleries.map((gallery, index) =>
                        <PortfolioHomeItem key={index} gallery={gallery} imgLoaded={() => this.imgLoaded(index)} />
                    )}
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(PortfolioHomeItems)