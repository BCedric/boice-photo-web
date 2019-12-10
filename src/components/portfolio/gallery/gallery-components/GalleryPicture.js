import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core';
import Fade from 'components/Fade';

function GalleryPicture({ picture, onClick }) {
    const [isLoading, setIsLoading] = useState(true)
    const { margin, photo } = picture
    const { width, height } = photo

    const onLoadPicture = () => {
        setIsLoading(false)
    }

    return (
        <div>
            {isLoading &&
                <div className="loader-container" style={{ width, margin: `0 ${margin}px`, height, padding: '0' }}>
                    <CircularProgress />
                </div>
            }
            <Fade show={!isLoading} className="clickable">
                <img
                    alt={picture.index}
                    onClick={() => onClick(picture)}
                    onLoad={() => onLoadPicture()}
                    src={picture.key}
                    style={{ width, margin: `0 ${margin}px`, height }} />
            </Fade>
        </div>
    )
}

export default GalleryPicture