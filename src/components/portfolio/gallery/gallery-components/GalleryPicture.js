import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    imgLoading: {
        display: 'none'
    }
})

function GalleryPicture({ picture, onClick }) {
    const [isLoading, setIsLoading] = useState(true)
    const { margin, photo } = picture
    const { width, height } = photo

    const onLoadPicture = () => {
        setIsLoading(false)
    }

    const classes = useStyles()

    return (
        <div>
            {isLoading &&
                <div className="loader-container" style={{ width, margin: `0 ${margin}px`, height, padding: '0' }}>
                    <CircularProgress />
                </div>
            }
            <img
                className={`clickable ${isLoading && classes.imgLoading}`}
                alt={picture.index}
                onClick={() => onClick(picture)}
                onLoad={() => onLoadPicture()}
                src={picture.key}
                style={{ width, margin: `0 ${margin}px` }} />
        </div>
    )
}

export default GalleryPicture