import React from "react";
import { Spinner } from "react-bootstrap"
import assetStyles from "../styles/Asset.module.css"


// Adapted from Asset.js by Code Institute
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