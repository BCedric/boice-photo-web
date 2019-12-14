import React, { useEffect, useState } from 'react'
import { default as List } from 'react-photo-gallery'
import { connect } from 'react-redux'

import config from 'config'
import GalleryPicture from './GalleryPicture'
import { galleryPicturesSelector } from 'redux/gallery-redux/selectors'
import { setCurrentPictureIndex } from 'redux/gallery-redux/actions'
import { number_of_pictures } from 'redux/gallery-redux/constants'

const PicturesList = connect(
    state => ({
        pictures: galleryPicturesSelector(state)
    }),
    dispatch => ({
        setCurrentPictureIndex: (id) => dispatch(setCurrentPictureIndex(id))
    })
)(
    function ({ pictures, setCurrentPictureIndex }) {
        const [picturesArray, setPicturesArray] = useState([])


        useEffect(() => {
            const picturesCopy = [...pictures.map(picture => ({ src: `${config.addressServer}${picture.addr}`, width: picture.width, height: picture.height }))]
            setPicturesArray(
                picturesCopy.reduce((acc, current, index) => {
                    if (index % number_of_pictures === 0) {
                        acc.push([current])
                    } else {
                        acc[acc.length - 1].push(current)
                    }
                    return acc
                }, []), picturesCopy)
        }, [pictures])
        const imageRenderer = (picture, arrayIndex) => {
            return (
                <GalleryPicture key={picture.index} picture={picture} onClick={(obj) => {
                    openLightbox(obj, arrayIndex)
                }} />
            )

        }

        const openLightbox = (obj, arrayIndex) => {
            setCurrentPictureIndex(obj.index + arrayIndex * number_of_pictures)
        }

        return (
            <div>
                {
                    picturesArray.map((pictures, arrayIndex) =>
                        <div>
                            <List
                                key={arrayIndex}
                                renderImage={(picture) => imageRenderer(picture, arrayIndex)}
                                photos={pictures}
                                columns={4}
                            />
                        </div>
                    )
                }
            </div>
        )
    }

)

export default PicturesList
