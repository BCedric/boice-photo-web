import React from 'react'
import { withStyles } from '@material-ui/styles'
import PortfolioHomeItem from './PortfolioHomeItem'
import { CircularProgress } from '@material-ui/core'
import Fade from 'components/Fade'

const styles = {
    container: {
        flexWrap: 'wrap',
        padding: '1em',
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

    everyImgsLoaded = () =>
        this.state.imgsLoaded.every(loaded => loaded === true)


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
                <Fade className={`centered-h ${classes.container}`} show={this.everyImgsLoaded()}>
                    {galleries.map((gallery, index) =>
                        <PortfolioHomeItem key={index} gallery={gallery} imgLoaded={() => this.imgLoaded(index)} />
                    )}
                </Fade>

            </div>
        )
    }
}

export default withStyles(styles)(PortfolioHomeItems)