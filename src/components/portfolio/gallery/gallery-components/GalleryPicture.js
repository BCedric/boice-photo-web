import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    imgLoading: {
        opacity: '0 !important',
        transition: 'opacity 0.5s',
        height: '0px',
        margin: '0 !important'

    },
    imgLoaded: {
        opacity: '1',
        transition: 'opacity 0.5s'
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
            {/* <button onClick={() => setIsLoading(false)} >clcik</button> */}
            {isLoading &&
                <div className="loader-container" style={{ width, margin: `0 ${margin}px`, height, padding: '0' }}>
                    <CircularProgress />
                </div>
            }
            <img
                className={`clickable  ${isLoading ? classes.imgLoading : classes.imgLoaded}`}
                alt={picture.index}
                onClick={() => onClick(picture)}
                onLoad={() => onLoadPicture()}
                src={picture.key}
                style={{ width, margin: `0 ${margin}px`, height }} />
        </div>
    )
}

export default GalleryPicture