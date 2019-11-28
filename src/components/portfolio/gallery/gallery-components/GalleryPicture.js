import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core';

function GalleryPicture(props) {
    const [isLoading, setIsLoading] = useState(true)
    const { margin, photo } = props.picture
    const { width, height } = photo

    const onLoadPicture = () => {
        setIsLoading(false)
    }

    return (
        <div>
            {isLoading &&
                <div className="loader-container" style={{ width, margin: `0 ${margin}px`, height }}>
                    <CircularProgress />
                </div>
            }
            <img
                className="clickable"
                alt={props.picture.index}
                onClick={() => props.onClick(props.picture)}
                onLoad={() => onLoadPicture()}
                src={props.picture.key}
                style={{ width, margin: `0 ${props.picture.margin}px` }} />
        </div>
    )
}

export default GalleryPicture