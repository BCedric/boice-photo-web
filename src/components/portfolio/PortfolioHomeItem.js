import React, { useState, useEffect } from 'react'

import MyLink from 'components/MyLink'

function PortfolioHomeItem({ gallery, imgLoaded }) {
    const [img, setImg] = useState(null)

    useEffect(() => {
        const imgTemp = new Image()
        imgTemp.onload = () => {
            imgLoaded()
        }
        imgTemp.src = gallery.src
        setImg(imgTemp)
    }, [gallery])

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

export default PortfolioHomeItem