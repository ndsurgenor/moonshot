import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../styles/Filters.module.css'

import { CgComment } from 'react-icons/cg';
import { FaCameraRetro, FaStar } from 'react-icons/fa';
import { FaPhotoFilm } from "react-icons/fa6";
import { LiaComments } from "react-icons/lia";
import { TbStarsFilled } from "react-icons/tb";


const Filters = () => {
    const [buttonStyle, setButtonStyle] = useState(styles.FilterButton);
    const changeButtonStyle = (e) => {
        e.target = setButtonStyle(styles.FilterActive);        
    };

    return (
        <Container className="d-md-flex m-auto g-0">
            <h5 className="d-none d-sm-inline m-auto me-1">
                Filters
            </h5>

            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>All photos</Tooltip>}>
                <Link to="/">
                    <span
                        className={buttonStyle}
                        onClick={changeButtonStyle}
                    >
                        <FaPhotoFilm
                            className={styles.FilterIcon}
                            aria-label="view all photos"
                        />
                    </span>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Your photos</Tooltip>}>
                <Link to="/photos/filtered/user-uploads">
                    <span
                        className={buttonStyle}
                        onClick={changeButtonStyle}
                    >
                        <FaCameraRetro
                            className={styles.FilterIcon}
                            aria-label="view photos you have uploaded"
                        />
                    </span>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Stars given</Tooltip>}>
                <Link to="/photos/filtered/stars-given">
                    <span
                        className={buttonStyle}
                        onClick={changeButtonStyle}
                    >
                        <FaStar
                            className={styles.FilterIcon}
                            aria-label="view photos you have starred"
                        />
                    </span>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Comments given</Tooltip>}>
                <Link to="/photos/filtered/comments-given">
                    <span
                        className={buttonStyle}
                        onClick={changeButtonStyle}
                    >
                        <CgComment
                            className={styles.FilterIcon}
                            aria-label="view photos you have commented on"
                        />
                    </span>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Stars received</Tooltip>}>
                <Link to="/photos/filtered/stars-received">
                    <span
                        className={buttonStyle}
                        onClick={changeButtonStyle}
                    >
                        <TbStarsFilled
                            className={styles.FilterIcon}
                            aria-label=" view your photos with stars"
                        />
                    </span>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Comments received</Tooltip>}>
                <Link to="/photos/filtered/comments-received">
                    <span
                        className={buttonStyle}
                        onClick={changeButtonStyle}
                    >
                        <LiaComments
                            className={styles.FilterIcon}
                            aria-label="view your photos with comments"
                        />
                    </span>
                </Link>
            </OverlayTrigger>

        </Container>
    )
}

export default Filters;