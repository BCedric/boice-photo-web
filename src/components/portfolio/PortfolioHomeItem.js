import React from 'react'

import MyLink from 'components/MyLink'

class PortfolioHomeItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { img: null }
    }

    componentDidMount() {
        const { imgLoaded, gallery } = this.props
        const imgTemp = new Image()
        imgTemp.onload = () => {
            imgLoaded()
        }
        imgTemp.src = gallery.src
        this.setState({ img: imgTemp })
    }

    render() {
        const { gallery } = this.props
        const { img } = this.state
        return (
            <MyLink className="unselectable clickable centered-h-v home-item"
                style={{
                    backgroundImage: img != null ? `url(${img.src})` : '',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 60%',
                }}
                to={gallery.link} >
                <span>
                    {gallery.name}
                </span>
            </MyLink >
        )
    }
}

export default PortfolioHomeItem