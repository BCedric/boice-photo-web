import React, { Component } from 'react';
import ImagesUploader from 'react-images-uploader';
import config from 'config'
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';

export default class UploadImage extends Component {
	render() {
		return (
			<div>
        <ImagesUploader
				url={config.adressServer+"/picture/1"}
				optimisticPreviews
				onLoadEnd={(err) => {
					if (err) {
						console.error(err);
					}
				}}
				label="Upload multiple images"
				/>
        </div>
		);
	}
}
