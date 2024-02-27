import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import styles from '../styles/Filters.module.css';

import { CgComment } from 'react-icons/cg';
import { FaCameraRetro, FaStar } from 'react-icons/fa';
import { FaPhotoFilm } from "react-icons/fa6";


const Filters = () => {
    const allPhotos = "/";
    const userPhotos = "/photos/filtered/user-uploads";
    const userStars = "/photos/filtered/stars-given";
    const userComments = "/photos/filtered/comments-given";
    const currentFilter = useLocation().pathname

    return (
        <Container className="d-md-flex m-auto g-0">

            {/* Label to left of filters on medium and larger screens */}
            <h5 className="d-none d-md-inline m-auto me-2">
                Filter
            </h5>

            {/* Filter Buttons */}
            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>All photos</Tooltip>}>
                <Link to={allPhotos}>
                    <span className={
                        currentFilter === allPhotos ?
                            styles.FilterActive : styles.FilterButton
                    }>
                        <FaPhotoFilm
                            className={styles.FilterIcon}
                            aria-label="view all photos"
                        />
                    </span>
                </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Your photos</Tooltip>}>
                <Link to={userPhotos}>
                    <span className={
                        currentFilter === userPhotos ?
                            styles.FilterActive : styles.FilterButton
                    }>
                        <FaCameraRetro
                            className={styles.FilterIcon}
                            aria-label="view photos you have uploaded"
                        />
                    </span>
                </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Stars given</Tooltip>}>
                <Link to={userStars}>
                    <span className={
                        currentFilter === userStars ?
                            styles.FilterActive : styles.FilterButton
                    }>
                        <FaStar
                            className={styles.FilterIcon}
                            aria-label="view photos you have starred"
                        />
                    </span>
                </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={
                <Tooltip>Comments given</Tooltip>}>
                <Link to={userComments}>
                    <span className={
                        currentFilter === userComments ?
                            styles.FilterActive : styles.FilterButton
                    }>
                        <CgComment
                            className={styles.FilterIcon}
                            aria-label="view photos you have commented on"
                        />
                    </span>
                </Link>
            </OverlayTrigger>

            {/* Label under filters on smaller screens */}
            <h6 className="d-md-none m-auto">
                Filter
            </h6>

        </Container>
    )
}

export default Filters;