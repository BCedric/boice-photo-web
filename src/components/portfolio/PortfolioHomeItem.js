import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'

import MyLink from 'components/MyLink'

const useStyles = makeStyles({
    link: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.2em',
        margin: '0.5em',
        width: '400px',
        height: '200px',
        fontFamily: 'Gilberto',
        fontSize: '3em',
        color: 'white',
        textDecoration: 'none',
        transition: 'opacity 0.2s, transform 0.3s',
        opacity: '0.9',
        '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            zIndex: '100',
            transform: 'scale(1.1, 1.1)',
            opacity: '1.5',
            transition: 'opacity 0.5s, transform 0.5s, box-shadow 0.5',
        }
    }
})

function PortfolioHomeItem({ gallery, imgLoaded }) {
    const [img, setImg] = useState(null)
    const { link } = useStyles()

    useEffect(() => {
        const imgTemp = new Image()
        imgTemp.onload = () => {
            imgLoaded()
        }
        imgTemp.src = gallery.src
        setImg(imgTemp)
    }, [])

    return (
        <MyLink className={`unselectable clickable ${link}`}
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

export default PortfolioHomeItem