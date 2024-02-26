import React from 'react';

import Spinner from 'react-bootstrap/Spinner'
import assetStyles from '../styles/Asset.module.css'


const Asset = ({ spinner, src, message }) => {
    return (
        <div className={assetStyles.Asset}>
            {spinner && <Spinner animation="grow" />}
            {src && <img src={src} alt={message} />}
            {message && <p>{message}</p>}
        </div>
    )
}

export default Asset;